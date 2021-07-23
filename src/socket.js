const http = require('http');
const app=require('./app');
app.set('port',process.env.PORT||3000);
const socketIo =require('socket.io');
const Incidencia = require('./models/Incidencia');
const Grupo =require('./models/Grupo');
let users=[];

const servidor=http.createServer(app);
const io=socketIo(servidor);

io.on('connection',socket=>{
	socket.on('login',async (data)=>{

        console.log(`${data.userName} is conected`);
        if(data.id_personal){
            try{
            const incidencias=await getCountIncidencias(data.id_personal);
            io.emit(`login_${data.id_personal}`,incidencias);
            }catch(err){
                console.error(err);
            }
        }
    });
	socket.on(`pendientes`,async (data)=>{
		if(data&&data.id_personal){
			try{
			const result= await getCountIncidencias(data.id_personal);
			io.emit(`pendientes_${data.id_personal}`,result);
			}catch(err){
				console.error(err);
			}
		}
	})
	socket.on('conectado',async (data)=>{
		if(data){
			const inc=JSON.parse(data).data;
			const id_personal=inc.id_sereno_asignado;
			let pos=-1;
			users.map((u,i)=>{
				if(u.id_personal===id_personal){
					pos=i;
					return;
				}
			});
			if(pos>=0){
				users[pos]={id_personal,incidents:users[pos].incidents+1};
			}else{
				users.push({id_personal,incidents:1});
			}
			const inci=await getCountIncidencias(id_personal);
			const resp={count:inci,incidencia:inc};
			io.emit(`usuario_${id_personal}`,resp);

			if(inc.id_grupo_asignado){
				const lista= await getAllPersonalByGroup(inc.id_grupo_asignado);
				lista.map(async p=>{
					const intmp=await getCountIncidencias(p.id_personal);
					const rp={count:intmp,incidencia:inc};
					io.emit(`usuario_${p.id_personal}`,rp);
				})
			}

		}
	})
	socket.on('streaming',async (obj)=>{
		if(obj){
			const data=JSON.parse(obj);

			console.log("DATA_FRON_STREAMING:",data.idUduario,data.userInfo);
			const idUsuario=data.idUduario;
			const userInfo=data.userInfo;	
			const resp={idUsuario,userInfo}
			users.push(resp);		
			io.emit(`streaming_conect`,resp);
		}
	})
	socket.on('streaming_list',()=>{
			io.emit('streaming_list',users);
		
	})
	socket.on('streaming_off',async (obj)=>{
		if(obj){
			let pos=-1;
			users.map((u,i)=>{
				if(u.id_personal===obj.id_personal){
					pos=i;
					return;
				}
			});
			console.log('POS_USU:',pos);
			if(pos>=0){
				console.log(users.splice(pos,1));
				
			}
			const data=JSON.parse(obj);
			console.log("DATA_FRON_STREAMING_OFF:",data);
			const idUsuario=data.idUduario;
			const userInfo=data.userInfo;	
			const resp={idUsuario,userInfo}		
			io.emit(`streaming_off`,resp);
		}
	})
});

const getCountIncidencias=async (idPersonal)=>{
    const countIncidenciasAsignadas= await Incidencia.getCountIncidenciasByIdSerenoAsignado(idPersonal);
    const countIncidenciasReportadas=await Incidencia.getCountIncidenciasByIdUsuarioRep(idPersonal);
    const incidencias={repo:countIncidenciasReportadas.count,asig:countIncidenciasAsignadas.count};
    return incidencias;
}

const getAllPersonalByGroup =async (idGrupo)=>{
	const lista=await Grupo.getPersonalAsignadoByIdgrupo(idGrupo);
	return lista;
}
module.exports=servidor;