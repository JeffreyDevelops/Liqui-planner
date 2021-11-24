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

    // eintrag_mit_gesamtbilanz_verechnen() {
    //     switch(this.neuer_eintrag.typ) {
    //         case "Einnahme":
    //             this.gesamtbilanz.einnahmen += this.neuer_eintrag.betrag;
    //             this.gesamtbilanz.bilanz += this.neuer_eintrag.betrag;
    //             break;
    //         case "Ausgabe":
    //             this.gesamtbilanz.ausgaben += this.neuer_eintrag.betrag;
    //             this.gesamtbilanz.bilanz -= this.neuer_eintrag.betrag;
    //             break;
    //         default: 
    //         console.log(`Der Typ "${this.neuer_eintrag.typ}" ist nicht bekannt!`);
    //             break;
    //     }
    // },
    // gesamtbilanz_ausgeben() {
    // console.log(`Einnahmen: ${this.gesamtbilanz.einnahmen} ct
    // Ausgaben: ${this.gesamtbilanz.ausgaben} ct
    // Bilanz: ${this.gesamtbilanz.bilanz} ct
    // Bilanz ist positiv ${this.gesamtbilanz.bilanz >= 0}`);    
    // },
    eintrag_hinzufuegen() {
        this.eintrag_erfassen();
        this.eintraege_ausgeben();
        // this.eintrag_mit_gesamtbilanz_verechnen();
        // this.gesamtbilanz_ausgeben();
    }
    
};


haushaltsbuch.eintrag_hinzufuegen();
haushaltsbuch.eintrag_hinzufuegen();
haushaltsbuch.eintrag_hinzufuegen();
console.log(haushaltsbuch);