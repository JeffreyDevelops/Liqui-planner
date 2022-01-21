/**
 * Das Modul "Eintrag" stellt die Klasse "Eintrag" zur Verfügung.
 * @module classes/Eintrag
 */

import liqui_planner from "../liqui-planner.js";

/**
 * Die Klasse "Eintrag" stellt alle Eigenschaften
 * und Methoden eines Eintrags (inkl. HTML und Events) zur Verfügung.
 */
export default class Eintrag {

    /**
     * Der Konstruktor generiert bei Instanziierung der Klasse "Eintrag"
     * anhand der u.g. Parameter ein Eintrags-Objekt mit den u.g. Eigenschaften.
     * @param {String} titel - der Titel des Eintrags
     * @param {Number} betrag - der Betrag des Eintrags (in Cent, ganzzahlig)
     * @param {String} typ - der Typ des Eintrags (entweder "einnahme" oder "ausgabe")
     * @param {Date} datum - das Datum des Eintrags
     * @prop {String} _titel - der Titel des Eintrags
     * @prop {Number} _betrag - der Betrag des Eintrags (in Cent, ganzzahlig)
     * @prop {String} _typ - der Typ des Eintrags (entweder "einnahme" oder "ausgabe")
     * @prop {Date} _datum - das Datum des Eintrags
     * @prop {Number} _timestamp - der Unix-Zeitstempel der Instanziierung des Eintrags (dient als ID)
     * @prop {Element} _html - das HTML des Eintrags
     */
    constructor(titel, betrag, typ, datum) {
        this._titel = titel;
        this._betrag = betrag;
        this._typ = typ;
        this._datum = datum;
        this._timestamp = Date.now();
        this._html = this._html_generieren();
    }

    /**
     * Getter-Methode für den Titel des Eintrags.
     * @return {String} - der Titel des Eintrags
     */
    titel() {
        return this._titel;
    }

    /**
     * Getter-Methode für den Betrag des Eintrags.
     * @return {Number} - der Betrag des Eintrags
     */
    betrag() {
        return this._betrag;
    }

    /**
     * Getter-Methode für den Typ des Eintrags.
     * @return {String} - der Typ des Eintrags
     */
    typ() {
        return this._typ;
    }

    /**
     * Getter-Methode für das Datum des Eintrags.
     * @return {Date} - das Datum des Eintrags
     */
    datum() {
        return this._datum;
    }

    /**
     * Getter-Methode für den Timestamp des Eintrags.
     * @return {Number} - der Timestamp des Eintrags
     */
    timestamp() {
        return this._timestamp;
    }

    /**
     * Getter-Methode für das HTML des Eintrags.
     * @return {Element} - das HTML des Eintrags
     */
    html() {
        return this._html;
    }

    /**
     * Diese private Methode definiert das Click-Event für den Eintrag-Entfernen-Button
     * der Eintragselemente und löst damit das Entfernen eines Eintrags aus dem
     * Haushaltsbuch aus. Sie wird in this._html_generieren() genutzt.
     * @param {Element} listenpunkt 
     */
    _eintrag_entfernen_event_hinzufuegen(listenpunkt) {
        listenpunkt.querySelector(".entfernen-button").addEventListener("click", e => {
            let timestamp = e.target.parentElement.getAttribute("data-timestamp");
            liqui_planner.eintrag_entfernen(timestamp);
        });
    }

    /**
     * Diese private Methode generiert das HTML eines Eintrags und setzt das Click-Event für den
     * Eintrag-Entfernen-Button mithilfe der Methode this._eintrag_entfernen_event_hinzufuegen().
     * @return {Element} - das Eintrags-Element mit all seinen Kindelementen und dem Click-Event
     */
    _html_generieren() {
        let listenpunkt = document.createElement("li");
        this._typ === "einnahme" ? listenpunkt.setAttribute("class", "einnahme") : listenpunkt.setAttribute("class", "ausgabe");
        listenpunkt.setAttribute("data-timestamp", this._timestamp);

        let datum = document.createElement("span");
        datum.setAttribute("class", "datum");
        datum.textContent = this._datum.toLocaleDateString("de-DE", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        });
        listenpunkt.insertAdjacentElement("afterbegin", datum);

        let titel = document.createElement("span");
        titel.setAttribute("class", "titel");
        titel.textContent = this._titel;
        datum.insertAdjacentElement("afterend", titel);

        let betrag = document.createElement("span");
        betrag.setAttribute("class", "betrag");
        betrag.textContent = `${(this._betrag / 100).toFixed(2).replace(/\./, ",")} €`;
        titel.insertAdjacentElement("afterend", betrag);

        let button = document.createElement("button");
        button.setAttribute("class", "entfernen-button");
        betrag.insertAdjacentElement("afterend", button);

        let icon = document.createElement("i");
        icon.setAttribute("class", "fas fa-trash");
        button.insertAdjacentElement("afterbegin", icon);

        this._eintrag_entfernen_event_hinzufuegen(listenpunkt);

        return listenpunkt;
    }
    
}