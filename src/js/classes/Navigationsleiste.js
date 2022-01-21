/**
 * Das Modul "Navigationsleiste" stellt die Klasse "Navigationsleiste" zur Verfügung.
 * @module classes/Navigationsleiste
 */

/**
 * Die Klasse "Navigationsleiste" stellt alle Eigenschaften
 * und Methoden der Navigationsleiste (inkl. HTML) zur Verfügung.
 */
export default class Navigationsleiste {

    /**
     * Der Konstruktor generiert bei Instanziierung der Klasse "Navigationsleiste"
     * das HTML der Navigationsleiste.
     * @prop {Element} _html - das HTML der Navigationsleiste
     */
    constructor() {
        this._html = this._html_generieren();
    }

    /**
     * Diese private Methode generiert das HTML der Navigationsleiste.
     * @return {Element} - das Navigationsleiste-Element mit all seinen Kindelementen
     */
    _html_generieren() {
        let navigationsleiste = document.createElement("nav");
        navigationsleiste.setAttribute("id", "navigationsleiste");

        let anker = document.createElement("a");
        anker.setAttribute("href", "#");

        let span = document.createElement("span");
        span.setAttribute("id", "markenname");
        span.textContent = "Liqui-Planner";
        anker.insertAdjacentElement("afterbegin", span);

        navigationsleiste.insertAdjacentElement("afterbegin", anker);

        return navigationsleiste;
    }

    /**
     * Diese Methode zeigt die generierte Navigationsleiste an der richtigen Stelle in der UI an.
     */
    anzeigen() {
        let body = document.querySelector("body");
        if (body !== null) {
            body.insertAdjacentElement("afterbegin", this._html);
        }
    }

    
}