/**
 * Das Modul "Monatsliste" stellt die Klasse "Monatsliste" zur Verfügung.
 * @module classes/Monatsliste
 */

/**
 * Die Klasse "Monatsliste" stellt alle Eigenschaften
 * und Methoden eines Eintrags (inkl. HTML) zur Verfügung.
 */
export default class Monatsliste {

    /**
     * Der Konstruktor generiert bei Instanziierung der Klasse "Monatsliste"
     * anhand der u.g. Parameter ein Monatsliste-Objekt mit den u.g. Eigenschaften.
     * @param {Number} jahr - das Jahr zu dem die Monatsliste gehört (z.B. 2020)
     * @param {Number} monat - der Monat zu dem die Monatsliste gehört (als Zahl, also z.B. 1 -> Januar, 2 -> Februar)
     * @prop {Number} _jahr - das Jahr zu dem die Monatsliste gehört (z.B. 2020)
     * @prop {Number} _monat - der Monat zu dem die Monatsliste gehört (als Zahl, also z.B. 1 -> Januar, 2 -> Februar)
     * @prop {Array} _eintraege - ein Arrays mit den Eintrags-Objekten der Monatsliste
     * @prop {Number} _bilanz - die Bilanz des Monats
     * @prop {Element} _html - das HTML der Monatsliste
     */
    constructor(jahr, monat) {
        this._jahr = jahr;
        this._monat = monat;
        this._eintraege = [];
        this._bilanz = 0;
        this._html = this._html_generieren();
    }

    /**
     * Getter-Methode für den Monat des Monatsliste.
     * @return {Number} - der Monat zu dem die Monatsliste gehört (als Zahl, also z.B. 1 -> Januar, 2 -> Februar)
     */
    monat() {
        return this._monat;
    }

    /**
     * Getter-Methode für das Jahr des Monatsliste.
     * @return {Number} - das Jahr zu dem die Monatsliste gehört (z.B. 2020)
     */
    jahr() {
        return this._jahr;
    }

    /**
     * Getter-Methode für das HTML der Monatsliste.
     * @return {Element} - das HTML der Monatsliste
     */
    html() {
        return this._html;
    }

    /**
     * Diese Methode fügt ein ihr übergebenes Eintrags-Objekt zur Sammlung der Einträge (this._eintraege)
     * der Monatsliste hinzu und aktualsiert anschließend die Eigenschaften der Monatsliste mit Hilfe der
     * Methode this._aktualisieren().
     * @param {Object} eintrag - ein Eintrags-Objekt
     */
    eintrag_hinzufuegen(eintrag) {
        this._eintraege.push(eintrag);
        this._aktualisieren();
    }

    /**
     * Diese private Methode sortiert die Sammlung der Einträge der Monatsliste absteigend nach Datum
     * des Eintrags. Einträge mit gleichem Datum werden absteigend nach Erstellungs-Timestamp des
     * Eintrags sortiert.
     */
    _eintraege_sortieren() {
        this._eintraege.sort((eintrag_a, eintrag_b) => {
            if (eintrag_a.datum() > eintrag_b.datum()) {
                return -1;
            } else if (eintrag_a.datum() < eintrag_b.datum()) {
                return 1;
            } else {
                if (eintrag_a.timestamp() > eintrag_b.timestamp()) {
                    return -1;
                } else {
                    return 1;
                }
            }
        });
    }

    /**
     * Diese private Methode bilanziert die Monatsliste anhand der in this._eintraege
     * enthaltenen Einträge und aktualisiert damit die Monatsbilanz.
     */
    _bilanzieren() {
        let monatsbilanz = 0;
        this._eintraege.forEach(eintrag => {
            if (eintrag.typ() === "einnahme") {
                monatsbilanz += eintrag.betrag();
            } else {
                monatsbilanz -= eintrag.betrag();
            }
        });
        this._bilanz = monatsbilanz;
    }

    /**
     * Diese private Methode generiert das HTML der Monatsliste.
     * @return {Element} - das Monatsliste-Element mit all seinen Kindelementen
     */
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
        monatsbilanz.textContent = `${(this._bilanz / 100).toFixed(2).replace(/\./, ",")} €`;
        ueberschrift.insertAdjacentElement("beforeend", monatsbilanz);

        monatsliste.insertAdjacentElement("afterbegin", ueberschrift);

        let eintragsliste = document.createElement("ul");
        this._eintraege.forEach(eintrag => {
            eintragsliste.insertAdjacentElement("beforeend", eintrag.html()); 
        });
        monatsliste.insertAdjacentElement("beforeend", eintragsliste);

        return monatsliste;
    }

    /**
     * Diese private Methode aktualisiert den Zustand der Monatsliste indem sie
     * die Einträge der Monatsliste in this._eintraege erneut sortiert, die Monatsliste 
     * erneut bilanziert und anschließend das HTML der Monatsliste erneut generiert.
     */
    _aktualisieren() {
        this._eintraege_sortieren();
        this._bilanzieren();
        this._html = this._html_generieren();
    }

    
}