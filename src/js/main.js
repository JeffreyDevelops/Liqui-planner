"use strict";

const haushaltsbuch = {
    gesamtbilanz: new Map(),

    eintraege: [],
    fehler: [],

    eintrag_erfassen() {
        let neuer_eintrag = new Map();
        neuer_eintrag.set("titel", this.titel_verarbeiten(prompt("Titel:")));
        neuer_eintrag.set("typ", this.typ_verarbeiten(prompt("Typ (Einnahme oder Ausgabe):")));
        neuer_eintrag.set("betrag", this.betrag_verarbeiten(prompt("Betrag (in Euro, ohne €-Zeichen):")));
        neuer_eintrag.set("datum", this.datum_verarbeiten(prompt("Datum (jjjj-mm-tt):")));
        neuer_eintrag.set("timestamp", Date.now());
        if  (this.fehler.length === 0) {
             this.eintraege.push(neuer_eintrag);   
        } else {
            console.log("Folgende Fehler wurden gefunden:")
            this.fehler.forEach(function(fehler) {
                console.log(fehler);
            });
        }
   
    },

    

    titel_verarbeiten(titel) {
        titel = titel.trim();
        if (this.titel_validieren(titel)) {
            // Bsp.:23,64 -> "23.64" -> 23.64 -> 2364
        return titel;
        } else {
            this.fehler.push("Kein Titel angegeben.");
        }
        
    },

    titel_validieren(titel) {
        if (titel !== "") {
            return true;
        } else {
            return false;
        }
    },

    typ_verarbeiten(typ) {
        typ = typ.trim().toLowerCase();
        if (this.typ_validieren(typ)) {
            // Bsp.:23,64 -> "23.64" -> 23.64 -> 2364
        return typ;
        } else {
            this.fehler.push(`Ungültiger Eintrags-Typ: "${typ}".`);
        }
        
    },

    typ_validieren(typ) {
        if (typ.match(/^(?:einnahme|ausgabe)$/) !== null) {
            return true;
        } else {
            return false;
        }
    },

    betrag_verarbeiten(betrag) {
        betrag = betrag.trim();
        if (this.betrag_validieren(betrag)) {
            // Bsp.:23,64 -> "23.64" -> 23.64 -> 2364
        return parseFloat(betrag.replace(",", ".")* 100);
        } else {
            this.fehler.push(`Ungültiger Betrag: "${betrag}".`);
        }
        
    },

    betrag_validieren(betrag) {
        if (betrag.match(/^\d+(?:(?:,|\.)\d\d?)?$/) !== null) {
            return true;
        } else {
            return false;
        }
    },

    datum_verarbeiten(datum) {
        datum = datum.trim();
        if (this.datum_validieren(datum)) {
            // Bsp.:23,64 -> "23.64" -> 23.64 -> 2364
        return new Date(`${datum} 00:00:00`);
        } else {
            this.fehler.push(`Ungültiges Datumsformat: ${datum}`);
        }
        
    },

    datum_validieren(datum) {
        if (datum.match(/^\d{4}-\d{2}-\d{2}$/) !== null) {
            return true;
        } else {
            return false;
        }
    },

    eintraege_sortieren() {
        this.eintraege.sort(function(eintrag_a, eintrag_b) {
            if(eintrag_a.get("datum") > eintrag_b.get("datum")) {
                return -1;
            } else if(eintrag_a.get("datum")  < eintrag_b.get("datum")) {
                return 1;
            } else {
                return 0;
            }
        });
    },

    html_eintrag_generieren(eintrag) {


        let listenpunkt = document.createElement("li");
        if (eintrag.get("typ") === "einnahme") {
            listenpunkt.setAttribute("class", "einnahme");
        } else if (eintrag.get("typ") === "ausgabe") {
            listenpunkt.setAttribute("class", "ausgabe");
        }
        listenpunkt.setAttribute("data-timestamp", eintrag.get("timestamp"));

        let datum = document.createElement("span");
        datum.setAttribute("class", "datum");
        datum.textContent = eintrag.get("datum").toLocaleDateString("de-DE", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        });
        listenpunkt.insertAdjacentElement("afterbegin", datum);

        let titel = document.createElement("span");
        titel.setAttribute("class", "titel");
        titel.textContent = eintrag.get("titel");
        datum.insertAdjacentElement("afterend", titel);

        let betrag = document.createElement("span");
        betrag.setAttribute("class", "betrag");
        betrag.textContent = `${(eintrag.get("betrag") / 100).toFixed(2).replace(/\./, ",")} €`;
        titel.insertAdjacentElement("afterend", betrag);

        let button = document.createElement("button");
        button.setAttribute("class", "entfernen-button");
        betrag.insertAdjacentElement("afterend", button);

        let icon = document.createElement("i");
        icon.setAttribute("class", "fas fa-trash");
        button.insertAdjacentElement("afterbegin", icon);

        return listenpunkt;
    },

    eintraege_anzeigen() {
        
        document.querySelectorAll(".monatsliste ul").forEach(function(eintragsliste) {
            eintragsliste.remove();
        });
     
        let eintragsliste = document.createElement("ul");
        for (let eintrag of this.eintraege) {
            eintragsliste.insertAdjacentElement("beforeend", this.html_eintrag_generieren(eintrag));
        }
        document.querySelector(".monatsliste").insertAdjacentElement("afterbegin", eintragsliste);
    },

    gesamtbilanz_erstellen() {
        let neue_gesamtbilanz = new Map();
        neue_gesamtbilanz.set("einnahmen", 0);
        neue_gesamtbilanz.set("ausgaben", 0);     
        neue_gesamtbilanz.set("bilanz", 0);
        this.eintraege.forEach(function(eintrag) {
            switch(eintrag.get("typ")) {
                case "einnahme":
                    neue_gesamtbilanz.set("einnahmen", neue_gesamtbilanz.get("einnahmen") + eintrag.get("betrag"));
                    neue_gesamtbilanz.set("bilanz", neue_gesamtbilanz.get("bilanz") + eintrag.get("betrag"));
                    break;
                case "ausgabe":
                    neue_gesamtbilanz.set("ausgaben", neue_gesamtbilanz.get("ausgaben") + eintrag.get("betrag"));
                    neue_gesamtbilanz.set("bilanz", neue_gesamtbilanz.get("bilanz") - eintrag.get("betrag"));
                    break;
                default: 
                console.log(`Der Typ "${eintrag.get("typ")}" ist nicht bekannt!`);
                    break;
            }
        });
        this.gesamtbilanz = neue_gesamtbilanz;
        
    },

    //     <aside id="gesamtbilanz">
    //     <h1>Gesamtbilanz</h1>
    //     <div class="gesamtbilanz-zeile einnahmen"><span>Einnahmen:</span><span>0,00 €</span></div>
    //     <div class="gesamtbilanz-zeile ausgaben"><span>Ausgaben:</span><span>0,00 €</span></div>
    //     <div class="gesamtbilanz-zeile bilanz"><span>Bilanz:</span><span class="positiv">0,00 €</span></div>
    // </aside>


    // html_gesamtbilanz_generieren
        // anhand der aktuellen Gesamtbilanz die Gesamtbilanz neu generieren

    html_gesamtbilanz_generieren() {

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
        if (this.gesamtbilanz.get("bilanz") >= 0) {
            bilanz_betrag.setAttribute("class", "positiv");
        } else if (this.gesamtbilanz.get("bilanz") < 0) {
            bilanz_betrag.setAttribute("class", "negativ");
        }
        bilanz_betrag.textContent = `${(this.gesamtbilanz.get("bilanz") / 100).toFixed(2).replace(/\./, ",")} €`;
        bilanz_zeile.insertAdjacentElement("beforeend", bilanz_betrag);
        gesamtbilanz.insertAdjacentElement("beforeend", bilanz_zeile);

        return gesamtbilanz;


        },

    gesamtbilanz_anzeigen() {

        document.querySelectorAll("#gesamtbilanz").forEach(function(gesamtbilanz) {
            gesamtbilanz.remove();
        });
        document.querySelector("body").insertAdjacentElement("beforeend", this.html_gesamtbilanz_generieren());

    },

    eintrag_hinzufuegen() {
        let weiterer_eintrag = true;
        while(weiterer_eintrag) {
        this.eintrag_erfassen();
        if (this.fehler.length === 0) {
            this.eintraege_sortieren();
            this.eintraege_anzeigen();
            this.gesamtbilanz_erstellen();
            this.gesamtbilanz_anzeigen();
        } else {
            this.fehler = [];
        }
        weiterer_eintrag = confirm("Weiteren Eintrag hinzufügen?");
        }
    }
    
};


    haushaltsbuch.eintrag_hinzufuegen();
    console.log(haushaltsbuch);

