class Calculatrice {
  constructor(operationPrecedenteTextElement, operationEncourTextElement) {
    this.operationPrecedenteTextElement = operationPrecedenteTextElement;
    this.operationEncourTextElement = operationEncourTextElement;
    this.effacer();
  }

  effacer() {
    this.operateurEnCour = "";
    this.operateurPrecedent = "";
    this.operation = undefined;
  }

  supprimer() {
    this.operateurEnCour = this.operateurEnCour.toString().slice(0, -1);
  }

  ajouterNombre(nombre) {
    if (nombre === "." && this.operateurEnCour.includes(".")) return;

    this.operateurEnCour = this.operateurEnCour.toString() + nombre.toString();
  }

  choixOperation(operation) {
    if (this.operateurEnCour === "") return;
    if (this.operateurPrecedent !== "") {
      this.compute();
    }
    this.operation = operation;
    this.operateurPrecedent = this.operateurEnCour;
    this.operateurEnCour = "";
  }

  compute() {
    let validation;
    const avant = parseFloat(this.operateurPrecedent);
    const enCours = parseFloat(this.operateurEnCour);
    if (isNaN(avant) || isNaN(enCours)) return;
    switch (this.operation) {
      case "+":
        validation = avant + enCours;
        break;
      case "-":
        validation = avant - enCours;
        break;
      case "/":
        validation = avant / enCours;
        break;
      case "*":
        validation = avant * enCours;
        break;
      default:
        return;
    }
    this.operateurEnCour = validation;
    this.operation = undefined;
    this.operateurPrecedent = "";
  }
  getEcranNombre(nombre) {
    const StringNombre = nombre.toString();
    const integerDigits = parseFloat(StringNombre.split(".")[0]);
    const decimalDigits = StringNombre.split(".")[1];
    let intergerEcran;
    if (isNaN(integerDigits)) {
      intergerEcran = "";
    } else {
      intergerEcran = integerDigits.toLocaleString("fr", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${intergerEcran}.${decimalDigits}`;
    } else {
      return intergerEcran;
    }
  }
  updateEcran() {
    this.operationEncourTextElement.innerText = this.getEcranNombre(
      this.operateurEnCour
    );
    if (this.operation != null) {
      this.operationPrecedenteTextElement.innerText = `${this.getEcranNombre(
        this.operateurPrecedent
      )} ${this.operation}`;
    } else {
      this.operationPrecedenteTextElement.innerText = "";
    }
  }
}

const nombreBoutons = document.querySelectorAll("[data-number]");
const operationBoutons = document.querySelectorAll("[data-operation]");
const egalBouton = document.querySelector("[data-equals]");
const supprimerBouton = document.querySelector("[data-delete]");
const effacerTousBouton = document.querySelector("[data-all-clear]");
const operationPrecedenteTextElement = document.querySelector(
  "[data-previous-operand]"
);
const operationEncourTextElement = document.querySelector(
  "[data-current-operand]"
);

const calculatrice = new Calculatrice(
  operationPrecedenteTextElement,
  operationEncourTextElement
);

nombreBoutons.forEach((bouton) => {
  bouton.addEventListener("click", () => {
    calculatrice.ajouterNombre(bouton.innerText);
    calculatrice.updateEcran();
  });
});

operationBoutons.forEach((bouton) => {
  bouton.addEventListener("click", () => {
    calculatrice.choixOperation(bouton.innerText);
    calculatrice.updateEcran();
  });
});

egalBouton.addEventListener("click", (bouton) => {
  calculatrice.compute();
  calculatrice.updateEcran();
});

effacerTousBouton.addEventListener("click", (bouton) => {
  calculatrice.effacer();
  calculatrice.updateEcran();
});

supprimerBouton.addEventListener("click", (e) => {
  calculatrice.supprimer();
  calculatrice.updateEcran();
});
