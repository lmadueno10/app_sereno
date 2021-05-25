const http = require('http');
const app=require('./app');
app.set('port',process.env.PORT||3000);
const socketIo =require('socket.io');
const Incidencia = require('./models/Incidencia');
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
		}
	})
});

const getCountIncidencias=async (idPersonal)=>{
    const countIncidenciasAsignadas= await Incidencia.getCountIncidenciasByIdSerenoAsignado(idPersonal);
    const countIncidenciasReportadas=await Incidencia.getCountIncidenciasByIdUsuarioRep(idPersonal);
    const incidencias={repo:countIncidenciasReportadas.count,asig:countIncidenciasAsignadas.count};
    return incidencias;
}

module.exports=servidor;