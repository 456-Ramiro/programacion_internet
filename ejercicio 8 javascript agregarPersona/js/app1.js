(function(){
	var coleccion = new Array();
	var randoEdades = [{label:'15-20', value:'15-20'},{label:'21-30', value:'21-30'},{label:'31-40', value:'31-40'},{label:'41-50',value:'41-50'}];
	
	var nombre;
	var apellido;
	var edad;
	var valor;
	var btnGuardar  = document.getElementById("btnGuardar");
	var btnActualizar = document.getElementById("btnActualizar");
	var tablabody;

	var crud ={
		 	inicializar:function() {	

			nombre = document.getElementById('nombre');
			apellido = document.getElementById('apellido');		
			edades = document.getElementById('agregarEdad');
			tablabody= document.getElementById('tablabody');

			randoEdades.forEach(function(item, index)
	        {        	
	            edades.options.add(crud.agregarElemento('option',item));
	        });

	           
				
	        btnGuardar.addEventListener('click',function(e){

	        	crud.crear(new persona(nombre.value,apellido.value,edades.options[edades.selectedIndex].value));
	        	crud.desplegarLista();
	        });  	
			
	       
			
		},
		agregarElemento:function(tipo,atributos){
			var elemento = document.createElement(tipo);
			for(propiedades in atributos){
				elemento[propiedades]= atributos[propiedades];
			}
			return elemento;
		},
		crear:function(persona){
			coleccion.push(persona);			
		},
		borrar:function(index){
            coleccion.splice(index,1);
            crud.desplegarLista();
        },
        leer:function(index){
            return coleccion[index];
        },
        actualizar:function(index, persona){
            coleccion[index] = persona;
        },
		desplegarLista:function(){
			
			tablabody.innerHTML = '';
			coleccion.forEach(function(item, index){
                var tr = tablabody.insertRow(-1);
                for(property in item){
                     tr.insertCell(-1).innerHTML = item[property];
                };
                var btnBorrar = crud.agregarElemento('button',{
                    id:'persona_' + index,
                    className:'btn-borrar',
                    value:index,
                });
                
                var btnEditar = crud.agregarElemento('button',{
                    id:'persona_' + index,
                    className:'btn-editar',
                    value:index
                });


                if(btnBorrar.addEventListener){
                	btnBorrar.addEventListener('click', function(e){
                        crud.borrar(index);
                        console.log(index);
                	});
                	btnEditar.addEventListener('click', function(e){
                        var persona = crud.leer(index);
                        nombre.value = persona.nombre;
                        apellido.value = persona.apellido;
                        btnActualizar.style.display ='inline-block';
                        btnGuardar.style.display='none';

                        btnActualizar.value = btnEditar.value;
                        

                    });             

                }else{
                	btnBorrar.addEventListener('onclick', function(e){
                        crud.borrar(index);
                	});
                	btnEditar.addEventListener('onclick', function(e){
                        var persona = crud.leer(index);
                        nombre.value = persona.nombre;
                        apellido.value = persona.apellido;
                        btnActualizar.style.display ='inline-block';
                        btnGuardar.style.display='none';
                        
                        btnActualizar.value = btnEditar.value;

                    });
                }          

                btnBorrar.innerHTML = "Eliminar";
                btnEditar.innerHTML = "Editar";

                tr.insertCell(-1).appendChild(btnBorrar);
                tr.insertCell(-1).appendChild(btnEditar);

            });
            btnActualizar.addEventListener('click', function(e){

            	console.log('hola');                   	
                
                persona.nombre = nombre.value;
                persona.apellido = apellido.value;  
                persona.edad = edades.options[edades.selectedIndex].value;      

                crud.actualizar(btnActualizar.value,persona);                
                btnActualizar.style.display ='none';
                btnGuardar.style.display='inline-block';
                crud.desplegarLista();

            });
			
		}
		
	}


    return crud;
})().inicializar();


