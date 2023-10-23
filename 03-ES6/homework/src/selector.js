var traverseDomAndCollectElements = function (matchFunc, startEl) {
  var resultSet = [];

  if (typeof startEl === "undefined") {
    startEl = document.body;
  }

  // recorre el árbol del DOM y recolecta elementos que matchien en resultSet
  // usa matchFunc para identificar elementos que matchien

  // TU CÓDIGO AQUÍ
  if(matchFunc(startEl)) resultSet.push(startEl)

  for (let i = 0; i < startEl.children.length; i++) {
    let resultado = traverseDomAndCollectElements(matchFunc, startEl.children[i])

    resultSet = [...resultSet, ...resultado]
  }

  return resultSet;
};

// Detecta y devuelve el tipo de selector
// devuelve uno de estos tipos: id, class, tag.class, tag

var selectorTypeMatcher = function (selector) {//".photos" "#photos" "div" "div.photos"
  // tu código aquí
  if(selector[0] === "#") return "id";
  if(selector[0] === ".") return "class"

  if(selector.includes(".")) return "tag.class"
  return "tag"


};

// NOTA SOBRE LA FUNCIÓN MATCH
// recuerda, la función matchFunction devuelta toma un elemento como un
// parametro y devuelve true/false dependiendo si el elemento
// matchea el selector.

var matchFunctionMaker = function (selector) { // ".photos"
  var selectorType = selectorTypeMatcher(selector);//"id"
  var matchFunction;//function
  if (selectorType === "id") {
    matchFunction = function(elemento){// recibe como parametro un elemento HTML
      return "#" + elemento.id === selector
    }
  } else if (selectorType === "class"){
    matchFunction = function(elemento){
      for (let i = 0; i < elemento.length; i++) {
        if("." + elemento.classList[i] === selector) return true;

      }
      return false;
    }
      
  } else if (selectorType === "tag.class") {
    matchFunction = function(elemento){
      let [tag, clase] = selector.split(".")

      return matchFunctionMaker(tag)(elemento) && matchFunctionMaker("." + clase)(elemento)

    }
  } else if (selectorType === "tag") {
    matchFunction = function(elemento){
      return elemento.tagName.toLowerCase() === selector.toLowerCase()
    }
  }
  return matchFunction;
};

var $ = function (selector) { //".photos"
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements;
};


