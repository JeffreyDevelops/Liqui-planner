"use strict";

const haushaltsbuch = {

    gesamtbilanz: new Map(),
    eintraege: [],

    eintrag_hinzufuegen(formulardaten) {
        let neuer_eintrag = new Map();
        neuer_eintrag.set("titel", formulardaten.titel);
        neuer_eintrag.set("betrag", formulardaten.betrag);
        neuer_eintrag.set("typ", formulardaten.typ);
        neuer_eintrag.set("datum", formulardaten.datum);
        neuer_eintrag.set("timestamp", Date.now());
        this.eintraege.push(neuer_eintrag);
        this.eintraege_sortieren();
        this.eintraege_anzeigen();
        this.gesamtbilanz_erstellen();
        this.gesamtbilanz_anzeigen();
    },

    eintrag_entfernen(timestamp) {
        let start_index;
        for (let i = 0; i < this.eintraege.length; i++) {
            if (this.eintraege[i].get("timestamp") === parseInt(timestamp)) {
                console.log(this.eintraege[i].get("timestamp"));
                start_index = i;
                break;
            }
        }
        this.eintraege.splice(start_index, 1);
        this.eintraege_anzeigen();
        this.gesamtbilanz_erstellen();
        this.gesamtbilanz_anzeigen();
    },

    eintraege_sortieren() {
        this.eintraege.sort((eintrag_a, eintrag_b) => {
            return eintrag_a.get("datum") > eintrag_b.get("datum") ? -1 : eintrag_a.get("datum") < eintrag_b.get("datum") ? 1 : 0;
        });
    },

    html_eintrag_generieren(eintrag) {

        let listenpunkt = document.createElement("li");
        eintrag.get("typ") === "einnahme" ? listenpunkt.setAttribute("class", "einnahme") : listenpunkt.setAttribute("class", "ausgabe");
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

        this.eintrag_entfernen_event_hinzufuegen(listenpunkt);

        return listenpunkt;
    },

    eintrag_entfernen_event_hinzufuegen(listenpunkt) {
        listenpunkt.querySelector(".entfernen-button").addEventListener("click", e => {
            let timestamp = e.target.parentElement.getAttribute("data-timestamp");
            this.eintrag_entfernen(timestamp);
        });
    },

    eintraege_anzeigen() {
        document.querySelectorAll(".monatsliste ul").forEach(eintragsliste => eintragsliste.remove());
        let eintragsliste = document.createElement("ul");
        this.eintraege.forEach(eintrag => eintragsliste.insertAdjacentElement("beforeend", this.html_eintrag_generieren(eintrag)));
        document.querySelector(".monatsliste").insertAdjacentElement("afterbegin", eintragsliste);
    },

    gesamtbilanz_erstellen() {
        let neue_gesamtbilanz = new Map();
        neue_gesamtbilanz.set("einnahmen", 0);
        neue_gesamtbilanz.set("ausgaben", 0);
        neue_gesamtbilanz.set("bilanz", 0);
        this.eintraege.forEach(eintrag => {
            switch (eintrag.get("typ")) {
                case "einnahme":
                    neue_gesamtbilanz.set("einnahmen", neue_gesamtbilanz.get("einnahmen") + eintrag.get("betrag"));
                    neue_gesamtbilanz.set("bilanz", neue_gesamtbilanz.get("bilanz") + eintrag.get("betrag"));
                    break;
                case "ausgabe":
                    neue_gesamtbilanz.set("ausgaben", neue_gesamtbilanz.get("ausgaben") + eintrag.get("betrag"));
                    neue_gesamtbilanz.set("bilanz", neue_gesamtbilanz.get("bilanz") - eintrag.get("betrag"));
                    break;
                default:
                    console.log(`Der Typ "${eintrag.get("typ")}" ist nicht bekannt.`);
                    break;
            }
        });
        this.gesamtbilanz = neue_gesamtbilanz;
    },

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
        this.gesamtbilanz.get("bilanz") >= 0 ? bilanz_betrag.setAttribute("class", "positiv") : bilanz_betrag.setAttribute("class", "negativ");
        bilanz_betrag.textContent = `${(this.gesamtbilanz.get("bilanz") / 100).toFixed(2).replace(/\./, ",")} €`;
        bilanz_zeile.insertAdjacentElement("beforeend", bilanz_betrag);
        gesamtbilanz.insertAdjacentElement("beforeend", bilanz_zeile);

        return gesamtbilanz;
    },

    gesamtbilanz_anzeigen() {
        document.querySelectorAll("#gesamtbilanz").forEach(gesamtbilanz => gesamtbilanz.remove());
        document.querySelector("body").insertAdjacentElement("beforeend", this.html_gesamtbilanz_generieren());
    }

};