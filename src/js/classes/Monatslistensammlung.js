/* 
    <section id="monatslisten">

</section> */

"use strict";

class Monatslistensammlung {

    constructor() {
        this._monatslisten = [];
        this._html = this._html_generieren();
    }

    eintrag_hinzufuegen(eintrag) {
        let eintragsmonat = eintrag.datum().toLocaleString("de-DE", {month: "numeric"});
        let eintragsjahr = eintrag.datum().toLocaleString("de-DE", {year: "nummeric"});
        let monatsliste_vorhanden = false;
        this._monatslisten.forEach(monatliste => {
            if (eintragsmonat === monatliste.monat() && eintragsjahr === monatliste.jahr()) {
                monatliste.eintrag_hinzufuegen(eintrag);
                monatsliste_vorhanden = true;
            }
        });

        if (!monatsliste_vorhanden) {
            this._monatsliste_hinzufuegen(eintragsjahr, eintragsmonat, eintrag);
        }

    }  

    _monatsliste_hinzufuegen(jahr, monat, eintrag) {
        let neue_monatsliste = new Monatsliste(jahr, monat);
        neue_monatsliste.eintrag_hinzufuegen(eintrag);
        this._monatslisten.push(neue_monatsliste);
    }
     

    _html_generieren() {

    }

    anzeigen() {

    }
    
}