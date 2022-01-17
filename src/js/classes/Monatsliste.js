"use strict";

/* <article class="monatsliste">
<h2>
        <span class="monat-jahr">Februar 2020</span>
        <span class="monatsbilanz negativ">-326,84€</span>
</h2> 

    <ul>
        <li>
        </li>
    </ul>
    
</article> 
*/

class Monatsliste {

    constructor(jahr, monat) {
        this._jahr = jahr; 
        this._monat = monat;
        this._eintraege = [];
        this._bilanz = 0;
        this._html = this._html_generieren();
    }

    _html_generieren() {
        
    }
    
}