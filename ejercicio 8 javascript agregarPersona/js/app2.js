(function(){
	var coleccion = new Array();
	var randoEdades = [{label:'1-10', value:'1-10'},{label:'11-20', value:'11-20'},{label:'21-30', value:'21-30'},{label:'31-40',value:'31-40'}];
	var nombre;
	var apellido;
    var telefono;
    var correo;
    var direccion;
    var cp;
	var edad;
	var btnGuardar;
	var btnActualizar;
    var divVista;
    var divPersona;
    var btnBorrar;
    var btnEditar;
    var p; 
    var validar = {

        textoV:function(cadena){
            var b=false;            
            var expr = /^[a-zA-Z\s]{3,30}$/;  
            if(expr.test(cadena)){
               b=true;
            }
            else{
                alert("nombre o apellido erroneo");
            }           
            return b; 
        },
        numeroTelefonoV:function(numero){
            var b=false;
            var expr = /^[0-9]{10}$/
            if(expr.test(numero)){
                b=true;
            } 
            else{
                alert("numero erroneo");
            }            
             return b; 
        },
        direccionV:function(direccion){
            var b=false;
            var expr = /[a-zA-Z0-9]{1,100}/;
            if(expr.test(direccion)){
                 b=true;
             }
            else{
                alert("direccion erronea");
            }            
             return b; 

        },
        correoV:function(correo){
            var b=false;
            var expr =/^([a-z]{1,20})([a-z0-9.-_]{1,20})@([a-z]{1,10})([.]{1})([a-z]{3})$/; 
            if(expr.test(correo)){
                b=true;
            }
             else{
                alert("correo erroneo");
            }  
             return b; 
        },
        numeroCPV:function(cp){
            var b=false;
            var expr = /^[0-9]{5}$/
            if(expr.test(cp)){
                b=true;
            }
            else{
                alert("C.P erroneo");
            }  
             return b; 
        }
    }


	var crud ={
		inicializar:function() {
            btnGuardar = document.getElementById('btnGuardar');	
            btnActualizar = document.getElementById('btnActualizar');
			nombre = document.getElementById('nombre');
			apellido = document.getElementById('apellido');		
			edades = document.getElementById('agregarEdad');			
            divVista = document.getElementById('vistaPersonas');
            telefono = document.getElementById('telefono');
            correo = document.getElementById('correo');
            direccion = document.getElementById('direccion');
            cp = document.getElementById('codigopostal');
			randoEdades.forEach(function(item)
	        {        	
	            edades.options.add(crud.agregarElemento('option',item));
	        });	           
				
	        btnGuardar.addEventListener('click',function(e){
      

                if(validar.textoV(nombre.value)&&validar.textoV(apellido.value) &&validar.numeroTelefonoV(telefono.value)&& validar.direccionV(direccion.value)&&validar.correoV(correo.value)&& validar.numeroCPV(cp.value)){
                    crud.crear(new persona(nombre.value,apellido.value,edades.options[edades.selectedIndex].value));
                    crud.desplegarLista();
                }              
	        	
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
			divVista.innerHTML = '';
			coleccion.forEach(function(item, index){ 
                divPersona = crud.agregarElemento('div',{
                    id:'usuario_'+index,
                    className:'usuario'
                });
                btnBorrar = crud.agregarElemento('button',{
                    id:'persona_' + index,
                    className:'btnB',
                    value:index,
                });                
                btnEditar = crud.agregarElemento('button',{
                    id:'persona_' + index,
                    className:'btnE',
                    value:index
                });
                p = crud.agregarElemento('p',{                    
                });
                divVista.appendChild(divPersona);
                p.innerHTML=item.nombre+" "+item.apellido+"."+" Edad: "+item.edad;
                var divUsuario=document.getElementById('usuario_'+index);
                divUsuario.appendChild(btnBorrar);
                divUsuario.appendChild(btnEditar);
                divUsuario.appendChild(p);
                if(btnBorrar.addEventListener){
                	btnBorrar.addEventListener('click', function(e){
                        crud.borrar(index);                        
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
                	btnBorrar.attachEvent('onclick', function(e){
                        crud.borrar(index);
                	});
                	btnEditar.attachEvent('onclick', function(e){
                        var persona = crud.leer(index);
                        nombre.value = persona.nombre;
                        apellido.value = persona.apellido;
                        btnActualizar.style.display ='inline-block';
                        btnGuardar.style.display='none';                        
                        btnActualizar.value = btnEditar.value;
                    });
                } 
            });
            if(btnActualizar.addEventListener){
                btnActualizar.addEventListener('click', function(e){               
                    persona.nombre = nombre.value;
                    persona.apellido = apellido.value;  
                    persona.edad = edades.options[edades.selectedIndex].value;
                    crud.actualizar(btnActualizar.value,persona);                
                    btnActualizar.style.display ='none';
                    btnGuardar.style.display='inline-block';
                    crud.desplegarLista();
                });	
            }else{
                 btnActualizar.attachEvent('onclick', function(e){               
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
	}
    return crud;
})().inicializar();