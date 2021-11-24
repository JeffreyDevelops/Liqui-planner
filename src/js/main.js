"use strict";

const haushaltsbuch = {
    gesamtbilanz: {
        einnahmen: 0,
        ausgaben: 0,
        bilanz: 0
    },

    eintraege: [],

    eintrag_erfassen() {
        this.eintraege.push(
            {
            titel: prompt("Titel:"),
            typ: prompt("Typ (Einnahme oder Ausgabe):"),
            betrag: parseInt(prompt("Betrag (in Cent):")),
            datum: prompt("Datum (jjjj-mm-tt")
        }

        );
   
    },
    
    eintraege_ausgeben() {
        console.clear();
        this.eintraege.forEach(function(eintrag) {
            console.log(`Titel: ${eintrag.titel}\n`
            + `Typ: ${eintrag.typ}\n`
            + `Betrag: ${eintrag.betrag} ct\n`
            + `Datum: ${eintrag.datum}`
            );
        });
    },

    gesamtbilanz_erstellen() {
        let neue_gesamtbilanz = {
            einnahmen:  0,
            ausgaben:  0,
            bilanz: 0
        };
        this.eintraege.forEach(function(eintrag) {
            switch(eintrag.typ) {
                case "Einnahme":
                    neue_gesamtbilanz.einnahmen += eintrag.betrag;
                    neue_gesamtbilanz.bilanz += eintrag.betrag;
                    break;
                case "Ausgabe":
                    neue_gesamtbilanz.ausgaben += eintrag.betrag;
                    neue_gesamtbilanz.bilanz -= eintrag.betrag;
                    break;
                default: 
                console.log(`Der Typ "${eintrag.typ}" ist nicht bekannt!`);
                    break;
            }
        });
        this.gesamtbilanz = neue_gesamtbilanz;
        
    },


    gesamtbilanz_ausgeben() {
    console.log(`Einnahmen: ${this.gesamtbilanz.einnahmen} ct\n`
        + `Ausgaben: ${this.gesamtbilanz.ausgaben} ct\n`
        + `Bilanz: ${this.gesamtbilanz.bilanz} ct\n`
        + `Bilanz ist positiv ${this.gesamtbilanz.bilanz >= 0}`);    
    },


    eintrag_hinzufuegen() {
        let weiterer_eintrag = true;
        while(weiterer_eintrag) {
        this.eintrag_erfassen();
        this.eintraege_ausgeben();
        this.gesamtbilanz_erstellen();
        this.gesamtbilanz_ausgeben();
        weiterer_eintrag = confirm("Weiteren Eintrag hinzufügen?");
        }
    }
    
};


    haushaltsbuch.eintrag_hinzufuegen();
    console.log(haushaltsbuch);

