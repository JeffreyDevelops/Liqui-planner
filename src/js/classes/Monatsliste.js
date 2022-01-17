"use strict";



class Monatsliste {

    constructor(jahr, monat) {
        this._jahr = jahr; 
        this._monat = monat;
        this._eintraege = [];
        this._bilanz = 0;
        this._html = this._html_generieren();
    }

    jahr() {
        return this._jahr;
    }

    html() {
        return this._html;
    }

    monat() {
        return this._monat;
    } 

    eintrag_hinzufuegen(eintrag) {
        this._eintraege.push(eintrag);
    }


    // _eintraege_sortieren() {
    //     this._eintraege.sort((eintrag_a, eintrag_b) => {
    //         return eintrag_a.datum() > eintrag_b.datum() ? -1 : eintrag_a.datum() < eintrag_b.datum() ? 1 : 0;
    //     });
    // }


    _html_generieren() {

        let monatsliste = document.createElement("article");
        monatsliste.setAttribute("class", "monatsliste");

        let ueberschrift = document.createElement("h2");
        
        let monat_jahr = document.createElement("span");
        monat_jahr.setAttribute("class", "monat-jahr");
        monat_jahr.textContent = `${new Date(this._jahr, this._monat - 1).toLocaleString("de-DE", {
            month: "long",
            year: "numeric"
        })}`;
        ueberschrift.insertAdjacentElement("afterbegin", monat_jahr);

        let monatsbilanz = document.createElement("span");
        if (this._bilanz >= 0) {
            monatsbilanz.setAttribute("class", "monatsbilanz positiv");
        } else {
            monatsbilanz.setAttribute("class", "monatsbilanz negativ");
        }
        ueberschrift.insertAdjacentElement("beforeend", monatsbilanz);

        monatsliste.insertAdjacentElement("afterbegin", ueberschrift);


        let eintragsliste = document.createElement("ul");
        this._eintraege.forEach(eintrag => eintragsliste.insertAdjacentElement("beforeend", eintrag.html()));
        monatsliste.insertAdjacentElement("beforeend", eintragsliste);

        return monatsliste;

    }
    
}