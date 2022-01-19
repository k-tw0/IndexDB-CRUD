import prodb, {
  bulkcreate,
  createEle,
  getData,
  SortObj
} from "./module.js";


let db = prodb("Productdb", {
  products: `++id, name, seller, price, state, numGuia, choferID, horaRec, folio,
  especie, variedad, packing, etiqueta, calibre, altura,
  codMix, numCajas, obsRegis`
});

const correlativoID = document.getElementById("correlativoID");
const codProduc = document.getElementById("codProduc");
const expor = document.getElementById("expor");
const fechaRec = document.getElementById("fechaRec");
  
const state = document.getElementById("state");
const numGuia = document.getElementById("numGuia");
const choferID = document.getElementById("choferID");
const horaRec = document.getElementById("horaRec");
  
const folio = document.getElementById("folio");
const especie = document.getElementById("especie");
const variedad = document.getElementById("variedad");
const packing = document.getElementById("packing");
  
const etiqueta = document.getElementById("etiqueta");
const calibre = document.getElementById("calibre");
const altura = document.getElementById("altura");
const codMix = document.getElementById("codMix");
const numCajas = document.getElementById("numCajas");

const obsRegis = document.getElementById("obsRegis");

// create button
const btncreate = document.getElementById("btn-create");
const btnread = document.getElementById("btn-read");
const btnupdate = document.getElementById("btn-update");
const btndelete = document.getElementById("btn-delete");
const error = document.getElementById("error");

// user data

// event listerner for create button
btncreate.onclick = event => {
  check()
};

function check(){
  var mensajeError = [];
 
  if( codProduc.value === "" ||expor.value === "" || fechaRec.value === "" || state.value === ""
  || numGuia.value === "" || choferID.value === "" || horaRec.value === "" || folio.value === "" || especie.value === ""
  || packing.value === "" || etiqueta.value === "" || variedad.value === "" || calibre.value === ""
  || altura.value === "" || codMix.value === "" || numCajas.value === "" || obsRegis.value === "")
  {
    if (codProduc.value === ""){
      mensajeError.push("-Nombre de productor");
    }
    if (expor.value === ""){
      mensajeError.push("<br/>Codigo de productor");
    }
    if (fechaRec.value === ""){
      mensajeError.push('Fecha');
    }
    if (state.value === ""){
      mensajeError.push('Estado(frio o sin)');
    }
    if (numGuia.value === ""){
      mensajeError.push('N Guia');
    }
    if (choferID.value === ""){
      mensajeError.push('El nombre chofer');
    }
    if (horaRec.value === ""){
      mensajeError.push('La hora');
    }
    if (folio.value === ""){
      mensajeError.push('El folio');
    }
    if (especie.value === ""){
      mensajeError.push('La especie');
    }
    if (packing.value === ""){
      mensajeError.push('El packing');
    }
    if (etiqueta.value === ""){
      mensajeError.push('La etiqueta');
    }
    if (variedad.value === ""){
      mensajeError.push('La variedad');
    }
    if (calibre.value === ""){
      mensajeError.push('El calibre');
    }
    if (altura.value === ""){
      mensajeError.push('La altura');
    }
    if (codMix.value === ""){
      mensajeError.push('El codigo del mix');
    }
    if (numCajas.value === ""){
      mensajeError.push('El Numero de cajas');
    }
    if (obsRegis.value === ""){
      mensajeError.push('La observacion');
    }
    
    Swal.fire(
      'Completa los siguientes datos:',
      mensajeError.join('<br/>-'),
      'error'
    )
  }
  else{
    insert()
    
  }
  return false;
  
} 

function insert(){
  // insert values
  let flag = bulkcreate(db.products, {
    name: codProduc.value,
    seller: expor.value,
    price: fechaRec.value,
    state: state.value,    
    numGuia: numGuia.value,

    choferID: choferID.value,
    horaRec: horaRec.value,
    folio: folio.value,
    especie: especie.value,
    variedad: variedad.value,
    packing: packing.value,
    etiqueta: etiqueta.value,
    calibre: calibre.value,
    altura: altura.value,
    codMix: codMix.value,
    numCajas: numCajas.value,
    obsRegis: obsRegis.value
  });
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Datos guardados correctamente',
    showConfirmButton: false,
    timer: 1500
  })
  //sweetalert2()
  // reset textbox values
  //proname.value = "";
  //seller.value = "";
  // price.value = "";
  codProduc.value = expor.value = fechaRec.value = state.value = numGuia.value = 
  choferID.value = horaRec.value = folio.value = especie.value = variedad.value = 
  packing.value = etiqueta.value = calibre.value = altura.value = codMix.value =
  numCajas.value = obsRegis.value = "";

  // set id textbox value
  getData(db.products, data => {
    correlativoID.value = data.id + 1 || 1;
  });
  table();
}

// event listerner for create button
btnread.onclick = table;

// button update
btnupdate.onclick = () => {
  const id = parseInt(correlativoID.value || 0);
  if (id) {
    // call dexie update method
    db.products.update(id, {
      name: codProduc.value,
      seller: expor.value,
      price: fechaRec.value,
      state: state.value,
      numGuia: numGuia.value,

      choferID: choferID.value,
      horaRec: horaRec.value,
      folio: folio.value,
      especie: especie.value,
      variedad: variedad.value,
      packing: packing.value,
      etiqueta: etiqueta.value,
      calibre: calibre.value,
      altura: altura.value,
      codMix: codMix.value,
      numCajas: numCajas.value,
      obsRegis: obsRegis.value
      
    }).then((updated) => {
      // let get = updated ? `data updated` : `couldn't update data`;
      let get = updated ? true : false;

      Swal.fire({
        title: 'Actualizacion de la base de datos completada',
        text: 'Los datos han sido actualizados',
        icon: 'success',
        confirmButtonText: 'Confirmar'
      })

      codProduc.value = expor.value = fechaRec.value = state.value = numGuia.value = 
      choferID.value = horaRec.value = folio.value = especie.value = variedad.value = 
      packing.value = etiqueta.value = calibre.value = altura.value = codMix.value =
      numCajas.value = obsRegis.value = "";
      //console.log(get);
    })
  } else {
    console.log(`Please Select id: ${id}`);
  }
}

// delete button
btndelete.onclick = () => {
  Swal.fire({
    title: 'Estas seguro(a)?',
    text: "No podras revertir esto!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, Eliminar todo!'
  }).then((result) => {
    if (result.isConfirmed) {
      borrar()
      Swal.fire(
        'Datos eliminados!',
        'Recepsiones eliminadas con exito',
        'success'
      )
    }
  })
}


function borrar(){
  db.delete();
  db = prodb("Productdb", {
    products: `++id, name, seller, price, state, numGuia, choferID, horaRec, folio,
    especie, variedad, packing, etiqueta, calibre, altura,
    codMix, numCajas, obsRegis`
  });
  db.open();
  table();
  textID(correlativoID);
  // display message
}

window.onload = event => {
  // set id textbox value
  textID(correlativoID);
};




// create dynamic table
function table() {
  const tbody = document.getElementById("tbody");
  const notfound = document.getElementById("notfound");
  notfound.textContent = "";
  // remove all childs from the dom first
  while (tbody.hasChildNodes()) {
    tbody.removeChild(tbody.firstChild);
  }


  getData(db.products, (data, index) => {
    if (data) {
      createEle("tr", tbody, tr => {
        for (const value in data) {
          createEle("td", tr, td => {
            td.textContent = data.price === data[value] ? `${data[value]}` : data[value];
          });
        }
        createEle("td", tr, td => {
          createEle("i", td, i => {
            i.className += "fas fa-edit btnedit";
            i.setAttribute(`data-id`, data.id);
            // store number of edit buttons
            i.onclick = editbtn;
          });
        })
        createEle("td", tr, td => {
          createEle("i", td, i => {
            i.className += "fas fa-trash-alt btndelete";
            i.setAttribute(`data-id`, data.id);
            // store number of edit buttons
            i.onclick = deletebtn;
          });
        })
      });
    } else {
      notfound.textContent = "No record found in the database...!";
    }

  });
}

const editbtn = (event) => {
  let id = parseInt(event.target.dataset.id);
  db.products.get(id, function (data) {
    let newdata = SortObj(data);
    correlativoID.value = newdata.id || 0;
    codProduc.value = newdata.name || "";
    expor.value = newdata.seller || "";
    fechaRec.value = newdata.price || "";
    state.value = newdata.state || "";
    numGuia.value = newdata.numGuia || "";
    choferID.value = newdata.choferID || "";
    horaRec.value = newdata.horaRec || "";
    folio.value = newdata.folio || "";
    especie.value = newdata.especie || "";
    variedad.value = newdata.variedad || "";
    packing.value = newdata.packing || "";
    etiqueta.value = newdata.etiqueta || "";
    calibre.value = newdata.calibre || "";
    altura.value = newdata.altura || "";
    codMix.value = newdata.codMix || "";
    numCajas.value = newdata.numCajas || "";
    obsRegis.value = newdata.obsRegis || "";
  });
}

// delete icon remove element 
const deletebtn = event => {
  let id = parseInt(event.target.dataset.id);
  Swal.fire({
    title: 'Usted esta ilimimando una recepcion ? ',
    text: "Se esta iliminando el correlativo: " + id,
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#4CAF50',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, Eliminar'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Datos eliminados!',
        'id de recepcion '+id+' eliminada',
        'success'
      )
      db.products.delete(id);
      table();
    }
    
  })
  
}

// textbox id
function textID(textboxid) {
  getData(db.products, data => {
    textboxid.value = data.id + 1 || 1;
  });
}