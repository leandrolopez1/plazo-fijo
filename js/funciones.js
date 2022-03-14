// Esta parte del código se ejecuta cuando se llama a la función calcular. 

class Operacion {
    constructor(nombreIngresado) {
      this.nombre = nombreIngresado.toUpperCase();
    }
    calcularPlazoFijo(capitalIngresado, plazoIngresado) {
      this.capital = capitalIngresado;
      this.plazo = plazoIngresado;
      if (document.getElementById("radio1").checked == true) {
      this.resultado = (((this.capital * 0.415) / 12) * this.plazo).toFixed(2);
      localStorage.setItem("resultadoPlazoFijo", this.resultado); // El resultado de los cálculos se envía al local storage.
      } else {
      this.resultado = (((this.capital * 0.05) / 12) * this.plazo).toFixed(2);
      localStorage.setItem("resultadoPlazoFijo", this.resultado); // El resultado de los cálculos se envía al local storage.
      }
    }
  }
  
  // La función calcular es llamada con el evento del botón calcular. 
  
  function calcular() {
    let capitalIngresado = Number(document.getElementById("idCapital").value);
    let plazoIngresado = document.getElementById("idPlazo").value;
    let nombreIngresado = document.getElementById("idNombre").value;
  
    const operacion = new Operacion(nombreIngresado);
    operacion.calcularPlazoFijo(capitalIngresado, plazoIngresado);
  
  // El resultado enviado al local storage es traído para el cálculo del monto total disponible al final del plazo de la inversión.
  
    let resultado = Number(localStorage.getItem("resultadoPlazoFijo")); 
    let monto = capitalIngresado + resultado;
  
    if (document.getElementById("radio1").checked == true) {
      let texto1 = document.getElementById("idTexto1");
      texto1.innerHTML = `QUERIDO ${operacion.nombre}, EL RESULTADO DE TU INVERSIÓN EN PLAZO FIJO ES EL SIGUIENTE:`;
      let texto2 = document.getElementById("idTexto2");
      texto2.innerHTML = "CAPITAL INVERTIDO: $" + capitalIngresado + " (ARG)";
      let texto3 = document.getElementById("idTexto3");
      texto3.innerHTML =
        "PLAZO DE LA INVERSIÓN: " + plazoIngresado + " mes/meses.";
      let texto4 = document.getElementById("idTexto4");
      texto4.innerHTML = `MONTO DISPONIBLE AL CABO DE ${plazoIngresado} (mes/meses): $${monto} (ARG)`;
      let texto5 = document.getElementById("idTexto5");
      texto5.innerHTML = `INTERESES GANADOS: $${resultado} (ARG)`;
      let texto6 = document.getElementById("idTexto6");
      texto6.innerHTML = `Este es tu resultado en moneda nacional ==> ARG`;
      $("#idTexto6").hide();
      $("p").css({"background-color": "white"})
      $("p").animate({width: "48rem"})
      $('body').append('<p>Para operar en dólares, seleccione la opción "EN DÓLARES" y oprima calcular.</p>');
      $("p:last").hide();
      $("p").mouseenter(function(){
        $("p").css({"color": "blue"})
        $("#idTexto6").show()
        $("p:last").show()
        $("p:last").css({"margin-top":"2rem", "color":"white"});
      })
      $("p").mouseleave(function(){
        $("p").css({"color": "black"})
        $("#idTexto6").hide()
        $("p:last").hide()
      })
      
    } else {
      let texto1 = document.getElementById("idTexto1");
      texto1.innerHTML = `QUERIDO ${operacion.nombre}, EL RESULTADO DE TU INVERSIÓN EN PLAZO FIJO ES EL SIGUIENTE:`;
      let texto2 = document.getElementById("idTexto2");
      texto2.innerHTML = "CAPITAL INVERTIDO: U$S" + capitalIngresado + " (U$S)";
      let texto3 = document.getElementById("idTexto3");
      texto3.innerHTML =
        "PLAZO DE LA INVERSIÓN: " + plazoIngresado + " mes/meses.";
      let texto4 = document.getElementById("idTexto4");
      texto4.innerHTML = `MONTO DISPONIBLE AL CABO DE ${plazoIngresado} (mes/meses): $${monto} (U$S)`;
      let texto5 = document.getElementById("idTexto5");
      texto5.innerHTML = `INTERESES GANADOS: $${resultado} (U$S)`;
      let texto6 = document.getElementById("idTexto6");
      texto6.innerHTML = `Este es tu resultado en moneda extranjera ==> U$S`;
      $("#idTexto6").hide();
      $("p").css({"background-color": "white"})
      $("p").animate({width: "48rem"})
      $('body').append('<p>Para operar en pesos, seleccione la opción "EN PESOS" y oprima calcular.</p>');
      $("p:last").hide(); 
      $("p").mouseenter(function(){
        $("p").css({"color": "green"})
        $("#idTexto6").show()
        $("p:last").show()
        $("p:last").css({"margin-top":"2rem", "color":"white"});
      })  
      $("p").mouseleave(function(){
        $("p").css({"color": "black"})
        $("#idTexto6").hide()
        $("p:last").hide()
      })
    } 
   
    localStorage.clear(); 
  } 
  
  // Evento del botón calcular.
  
  let boton = document.getElementById("idBotonCalcular");
      boton.addEventListener("click", respuestaClick);
      function respuestaClick() {
        calcular();}
  
  
  // Consumo de API de usuarios
  
  const URLGET = "https://random-data-api.com/api/users/random_user?size=1"
  
  // Agregamos botones con jQuery
  
  $("body").before('<button id="btn1" onclick="this.disabled=true">SOPORTE</button>');
  $("body").before('<button id="btn2">OCULTAR</button>');
  
  $("#btn2").hide();
  
  // Escuchamos el evento click del botón soporte
  
  $("#btn1").click(() => { 
      $.get(URLGET, function (respuesta, estado) {
            if(estado === "success"){           
              let misDatos = respuesta;
              for (const dato of misDatos) {
                $("body").before(`<div class = "pfo">                                  
                                     <h4 style = "color: white"> ${dato.email}</h4>
                                     <h4 style = "color: white"> ${dato.phone_number}</h4>
                                    </div>`);
              }  
              $("#btn2").show();
            }
      });  
  });
  
  // Evento del botón ocultar
  
  $("#btn2").click(() => {
    $("#btn2").hide();
    $(".pfo").hide();
    document.getElementById("btn1").disabled = false;
  })