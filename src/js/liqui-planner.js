/**
 * Das Hauptmodul "main" ist für die Instanziierung des Haushaltsbuchs und den
 * Start der Anwendung zuständig.
 * @module main
 */

import Haushaltsbuch from "./classes/Haushaltsbuch.js";

/** 
 * Instanziierung des Haushaltsbuchs und Start der Anwendung.
 */
let liqui_planner = new Haushaltsbuch();
liqui_planner.start();

export default liqui_planner;
