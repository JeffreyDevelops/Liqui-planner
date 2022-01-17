"use strict";

class Haushaltsbuch {

    constructor() {
        this._eintraege = [];
        this._monatslistensammlung = new Monatslistensammlung();
        this._gesamtbilanz = new Gesamtbilanz();
    }

    eintrag_hinzufuegen(formulardaten) {
        let neuer_eintrag = new Eintrag(
            formulardaten.titel, 
            formulardaten.betrag, 
            formulardaten.typ, 
            formulardaten.datum
            );
        this._eintraege.push(neuer_eintrag);
        console.log(this);
        this._eintraege_sortieren();
        this._eintraege_anzeigen();
        this._gesamtbilanz.aktualisieren(this._eintraege);
    }

    eintrag_entfernen(timestamp) {

        let start_index;
        for (let i = 0; i < this._eintraege.length; i++) {
            if (this._eintraege[i].timestamp() === parseInt(timestamp)) {
                start_index = i;
                break;
            }
        }

        this._eintraege.splice(start_index, 1);
        this._eintraege_anzeigen();
        this._gesamtbilanz.aktualisieren(this._eintraege);
    }

    _eintraege_sortieren() {
        this._eintraege.sort((eintrag_a, eintrag_b) => {
            return eintrag_a.datum() > eintrag_b.datum() ? -1 : eintrag_a.datum() < eintrag_b.datum() ? 1 : 0;
        });
    }


    _eintraege_anzeigen() {
        
        document.querySelectorAll(".monatsliste ul").forEach((eintragsliste) => eintragsliste.remove());
        let eintragsliste = document.createElement("ul");
        this._eintraege.forEach(eintrag => eintragsliste.insertAdjacentElement("beforeend", eintrag.html()));
        document.querySelector(".monatsliste").insertAdjacentElement("afterbegin", eintragsliste);
    }
    
}