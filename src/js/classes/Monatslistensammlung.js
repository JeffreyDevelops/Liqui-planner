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
        // Werte für Monat und Jahr holen
        let eintragsmonat = eintrag.datum().toLocaleString("de-DE", {month: "numeric"});
        let eintragsjahr = eintrag.datum().toLocaleString("de-DE", {year: "nummeric"});
        // Prüfen, ob Monatsliste schon vorhanden ist
        let monatsliste_vorhanden = false;
        this._monatslisten.forEach(monatliste => {
            if (eintragsmonat === monatliste.monat() && eintragsjahr === monatliste.jahr()) {
                monatliste.eintrag_hinzufuegen(eintrag);
                monatsliste_vorhanden = true;
            }
        });

        if (!monatsliste_vorhanden) {
            this._monatsliste_hinzufuegen();
        }
            // wenn vorhanden:  Eintrag zu Monatsliste hinzufuegen -> (monatsliste.eintrag_hinzufuegen(eintrag)
            // wenn NICHT vorhanden: neue Monatsliste instaziieren -° this._monatslistE_hinzufuegen()
    }  

    _monatsliste_hinzufuegen() {

    }
     

    _html_generieren() {

    }

    anzeigen() {

    }
    
}