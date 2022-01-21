import Fehler from "./Fehler.js";
import haushaltsbuch from "./../main.js";

export default class Eingabeformular {

    constructor() {
        this._html = this._html_generieren();
    }

    _formulardaten_holen(e) {
        return {
            titel: e.target.elements.titel.value,
            betrag: e.target.elements.betrag.value,
            einnahme: e.target.elements.einnahme.checked,
            datum: e.target.elements.datum.valueAsDate
        }
    }

    _formulardaten_verarbeiten(formulardaten) {
        return {
            titel: formulardaten.titel.trim(),
            typ: formulardaten.einnahme === false ? "ausgabe" : "einnahme",
            betrag: parseFloat(formulardaten.betrag) * 100,
            datum: formulardaten.datum
        }
    }

    _formulardaten_validieren(formulardaten) {

        let fehler = [];
        if (formulardaten.titel === "") {
            fehler.push("Titel");
        }
        if(isNaN(formulardaten.betrag)) {
            fehler.push("Betrag");
        }
        if(formulardaten.datum === null) {
            fehler.push("Datum");
        }
        return fehler;

    }

    _datum_aktualisieren() {
        let datums_input = document.querySelector("#datum");
        if(datums_input !== null) {
            datums_input.valueAsDate = new Date();
        }
        
    }

    _absenden_event_hinzufuegen(eingabeformular) {
        eingabeformular.querySelector("#eingabeformular").addEventListener("submit", e => {
            e.preventDefault();
            let formulardaten = this._formulardaten_verarbeiten(this._formulardaten_holen(e));
            console.log(formulardaten);
            let formular_fehler = this._formulardaten_validieren(formulardaten);
            if (formular_fehler.length === 0) {
                haushaltsbuch.eintrag_hinzufuegen(formulardaten);
                let bestehende_fehlerbox = document.querySelector(".fehlerbox");
                if (bestehende_fehlerbox !== null) {
                bestehende_fehlerbox.remove();
                }
                e.target.reset();
                this._datum_aktualisieren();
            } else {
                let fehler = new Fehler("Folgende Felder wurden nicht korrekt ausgefüllt:", formular_fehler);
                fehler.anzeigen();
            }

        });
    }

    _html_generieren() {
        let eingabeformular = document.createElement("section");
        eingabeformular.setAttribute("id", "eingabeformular-container");
        eingabeformular.innerHTML = `<form id="eingabeformular" action="#" method="get"></form>
        <div class="eingabeformular-zeile">
            <h1>Neue Einnahme / Ausgabe hinzufügen</h1>
        </div>
        <div class="eingabeformular-zeile">
            <div class="titel-typ-eingabe-gruppe">
                <label for="titel">Titel</label>
                <input type="text" id="titel" form="eingabeformular" name="titel" placeholder="z.B. Einkaufen" size="10" title="Titel des Eintrags">
                <input type="radio" id="einnahme" name="typ" value="einnahme" form="eingabeformular" title="Typ des Eintrags">
                <label for="einnahme" title="Typ des Eintrags">Einnahme</label>
                <input type="radio" id="ausgabe" name="typ" value="ausgabe" form="eingabeformular" title="Typ des Eintrags" checked>
                <label for="ausgabe" title="Typ des Eintrags">Ausgabe</label>
            </div>
        </div>
        <div class="eingabeformular-zeile">
            <div class="betrag-datum-eingabe-gruppe">
                <label for="betrag">Betrag</label>
                <input type="number" id="betrag" name="betrag" form="eingabeformular" placeholder="z.B. 10,42" size="10" step="0.01" title="Betrag des Eintrags (max. zwei Nachkommastellen, kein €-Zeichen)">
                <label for="datum">Datum</label>
                <input type="date" id="datum" name="datum" form="eingabeformular" placeholder="jjjj-mm-tt" size="10" title="Datum des Eintrags (Format: jjjj-mm-tt)">
            </div>
        </div>
        <div class="eingabeformular-zeile">
            <button class="standard" type="submit" form="eingabeformular">Hinzufügen</button>
        </div>`;

        this._absenden_event_hinzufuegen(eingabeformular);

        return eingabeformular;
    }

    anzeigen() {
        let navigationsleiste = document.querySelector("body");
        if (navigationsleiste !== null) {
            navigationsleiste.insertAdjacentElement("afterbegin", this._html);
            this._datum_aktualisieren();
        }
        
    }

    
}