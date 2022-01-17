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
        this._gesamtbilanz_erstellen();
        this._gesamtbilanz_anzeigen();
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
        this._gesamtbilanz_erstellen();
        this._gesamtbilanz_anzeigen();

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

    _gesamtbilanz_erstellen() {
        let neue_gesamtbilanz = new Map();
        neue_gesamtbilanz.set("einnahmen", 0);
        neue_gesamtbilanz.set("ausgaben", 0);     
        neue_gesamtbilanz.set("bilanz", 0);
        this._eintraege.forEach(eintrag => {
            switch(eintrag.typ()) {
                case "einnahme":
                    neue_gesamtbilanz.set("einnahmen", neue_gesamtbilanz.get("einnahmen") + eintrag.betrag());
                    neue_gesamtbilanz.set("bilanz", neue_gesamtbilanz.get("bilanz") + eintrag.betrag());
                    break;
                case "ausgabe":
                    neue_gesamtbilanz.set("ausgaben", neue_gesamtbilanz.get("ausgaben") + eintrag.betrag());
                    neue_gesamtbilanz.set("bilanz", neue_gesamtbilanz.get("bilanz") - eintrag.betrag());
                    break;
                default: 
                console.log(`Der Typ "${eintrag.typ()}" ist nicht bekannt!`);
                    break;
            }
        });
        this.gesamtbilanz = neue_gesamtbilanz;
        
    }

    _html_gesamtbilanz_generieren() {

        let gesamtbilanz = document.createElement("aside");
        gesamtbilanz.setAttribute("id", "gesamtbilanz");
        
        let ueberschrift = document.createElement("h1");
        ueberschrift.textContent = "Gesamtbilanz";
        gesamtbilanz.insertAdjacentElement("afterbegin", ueberschrift);

        let einnahmen_zeile = document.createElement("div");
        einnahmen_zeile.setAttribute("class", "gesamtbilanz-zeile einnahmen");
        let einnahmen_titel = document.createElement("span");
        einnahmen_titel.textContent = "Einnahmen:";
        einnahmen_zeile.insertAdjacentElement("afterbegin", einnahmen_titel);
        let einnahmen_betrag = document.createElement("span");
        einnahmen_betrag.textContent = `${(this.gesamtbilanz.get("einnahmen") / 100).toFixed(2).replace(/\./, ",")} €`;
        einnahmen_zeile.insertAdjacentElement("beforeend", einnahmen_betrag);
        gesamtbilanz.insertAdjacentElement("beforeend", einnahmen_zeile);

        let ausgaben_zeile = document.createElement("div");
        ausgaben_zeile.setAttribute("class", "gesamtbilanz-zeile ausgaben");
        let ausgaben_titel = document.createElement("span");
        ausgaben_titel.textContent = "Ausgaben:";
        ausgaben_zeile.insertAdjacentElement("afterbegin", ausgaben_titel);
        let ausgaben_betrag = document.createElement("span");
        ausgaben_betrag.textContent = `${(this.gesamtbilanz.get("ausgaben") / 100).toFixed(2).replace(/\./, ",")} €`;
        ausgaben_zeile.insertAdjacentElement("beforeend", ausgaben_betrag);
        gesamtbilanz.insertAdjacentElement("beforeend", ausgaben_zeile);

        let bilanz_zeile = document.createElement("div");
        bilanz_zeile.setAttribute("class", "gesamtbilanz-zeile bilanz");
        let bilanz_titel = document.createElement("span");
        bilanz_titel.textContent = "Bilanz:";
        bilanz_zeile.insertAdjacentElement("afterbegin", bilanz_titel);
        let bilanz_betrag = document.createElement("span");
        this.gesamtbilanz.get("bilanz") >= 0 ? bilanz_betrag.setAttribute("class", "positiv") : bilanz_betrag.setAttribute("class", "negativ");
        bilanz_betrag.textContent = `${(this.gesamtbilanz.get("bilanz") / 100).toFixed(2).replace(/\./, ",")} €`;
        bilanz_zeile.insertAdjacentElement("beforeend", bilanz_betrag);
        gesamtbilanz.insertAdjacentElement("beforeend", bilanz_zeile);

        return gesamtbilanz;

        }

    _gesamtbilanz_anzeigen() {

        document.querySelectorAll("#gesamtbilanz").forEach(gesamtbilanz => gesamtbilanz.remove());
        document.querySelector("body").insertAdjacentElement("beforeend", this._html_gesamtbilanz_generieren());

    }

    
}