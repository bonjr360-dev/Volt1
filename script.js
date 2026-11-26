console.log("Ohms Law JavaScript loaded");
console.log("Ohms calculator:", document.getElementById("ohmsMode"));
function calculateCurrent() {
    const power = Number(document.getElementById("power").value);
    const voltage = Number(document.getElementById("voltage").value);
    const pf = Number(document.getElementById("pf").value);

    if (power <= 0 || voltage <= 0 || pf <= 0 || pf > 1) {
        document.getElementById("result").textContent =
            "Please enter valid values. Power factor must be between 0 and 1.";
        return;
    }

    const current = (power * 1000) /
        (Math.sqrt(3) * voltage * pf);

    document.getElementById("result").textContent =
        "Current = " + current.toFixed(2) + " A";
}
function calculateSinglePhase() {

    const power = Number(document.getElementById("singlePower").value);
    const voltage = Number(document.getElementById("singleVoltage").value);
    const pf = Number(document.getElementById("singlePF").value);

    const result = document.getElementById("singleResult");

    if (
        document.getElementById("singlePower").value.trim() === "" ||
        document.getElementById("singleVoltage").value.trim() === "" ||
        document.getElementById("singlePF").value.trim() === ""
    ) {
        result.textContent = "Please fill in all fields.";
        return;
    }

    if (power <= 0 || voltage <= 0 || pf <= 0 || pf > 1 ||
        !Number.isFinite(power) ||
        !Number.isFinite(voltage) ||
        !Number.isFinite(pf)) {

        result.textContent = "Please enter valid values.";
        return;
    }

    const current = (power * 1000) / (voltage * pf);

    result.textContent = `Calculated Current: ${current.toFixed(2)} A`;
}

document.addEventListener("DOMContentLoaded", function () {

    const mode = document.getElementById("ohmsMode");
    const input1 = document.getElementById("ohmsInput1");
    const input2 = document.getElementById("ohmsInput2");
    const label1 = document.getElementById("ohmsLabel1");
    const label2 = document.getElementById("ohmsLabel2");
    const result = document.getElementById("ohmsResult");
    const button = document.getElementById("ohmsCalculateBtn");

    function updateInputs() {
        if (mode.value === "voltage") {
            label1.textContent = "Current (A)";
            label2.textContent = "Resistance (Ω)";
            input1.placeholder = "Enter current in amperes";
            input2.placeholder = "Enter resistance in ohms";
        } 
        else if (mode.value === "current") {
            label1.textContent = "Voltage (V)";
            label2.textContent = "Resistance (Ω)";
            input1.placeholder = "Enter voltage in volts";
            input2.placeholder = "Enter resistance in ohms";
        } 
        else {
            label1.textContent = "Voltage (V)";
            label2.textContent = "Current (A)";
            input1.placeholder = "Enter voltage in volts";
            input2.placeholder = "Enter current in amperes";
        }

        input1.value = "";
        input2.value = "";
        result.textContent = "Enter the required values.";
    }

    function calculateOhmsLaw() {
        const a = Number(input1.value);
        const b = Number(input2.value);

        if (input1.value.trim() === "" || input2.value.trim() === "") {
            result.textContent = "Please enter both values.";
            return;
        }

        if (!Number.isFinite(a) || !Number.isFinite(b) || a <= 0 || b <= 0) {
            result.textContent = "Please enter valid positive values.";
            return;
        }

        let answer;
        let parameter;
        let unit;

        if (mode.value === "voltage") {
            answer = a * b;
            parameter = "Voltage";
            unit = "V";
        } 
        else if (mode.value === "current") {
            answer = a / b;
            parameter = "Current";
            unit = "A";
        } 
        else {
            answer = a / b;
            parameter = "Resistance";
            unit = "Ω";
        }

        result.textContent =
            parameter + " = " + answer.toFixed(2) + " " + unit;
    }

    mode.addEventListener("change", updateInputs);
    button.addEventListener("click", calculateOhmsLaw);

    updateInputs();
});
// POWER FACTOR CALCULATOR

document.addEventListener("DOMContentLoaded", function () {

    const activePowerInput = document.getElementById("pfPower");
    const apparentPowerInput = document.getElementById("pfApparent");
    const calculateButton = document.getElementById("pfCalculateBtn");
    const result = document.getElementById("pfResult");

    calculateButton.addEventListener("click", function () {

        const P = Number(activePowerInput.value);
        const S = Number(apparentPowerInput.value);

        if (activePowerInput.value === "" || apparentPowerInput.value === "") {
            result.textContent = "Please enter both power values.";
            return;
        }

        if (P <= 0 || S <= 0 || P > S) {
            result.textContent = "Enter valid values. Active power cannot exceed apparent power.";
            return;
        }

        const powerFactor = P / S;
        const angle = Math.acos(powerFactor) * (180 / Math.PI);

        result.innerHTML = `
            <h3>Results</h3>
            <p>Power Factor: <strong>${powerFactor.toFixed(3)}</strong></p>
            <p>Phase Angle: <strong>${angle.toFixed(2)}°</strong></p>
        `;
    });

});
// =====================================
// VOLTAGE DROP CALCULATOR
// =====================================

document.addEventListener("DOMContentLoaded", function () {

    const system = document.getElementById("vdSystem");
    const voltage = document.getElementById("vdVoltage");
    const current = document.getElementById("vdCurrent");
    const length = document.getElementById("vdLength");

    const size = document.getElementById("vdSize");
    const customContainer = document.getElementById("customSizeContainer");
    const customInput = document.getElementById("customCableSize");

    const material = document.getElementById("vdMaterial");

    const button = document.getElementById("vdCalculateBtn");
    const result = document.getElementById("vdResult");


    // SHOW OR HIDE CUSTOM CABLE SIZE INPUT

    size.addEventListener("change", function () {

        if (size.value === "custom") {

            customContainer.style.display = "block";

        } else {

            customContainer.style.display = "none";
            customInput.value = "";

        }

    });


    // CALCULATE VOLTAGE DROP

    button.addEventListener("click", function () {

        const V = Number(voltage.value);
        const I = Number(current.value);
        const L = Number(length.value);

        const A = size.value === "custom"
            ? Number(customInput.value)
            : Number(size.value);

        const rho = Number(material.value);


        // INPUT VALIDATION

        if (
            voltage.value.trim() === "" ||
            current.value.trim() === "" ||
            length.value.trim() === ""
        ) {

            result.textContent = "Please fill in all required fields.";
            return;

        }

        if (
            !Number.isFinite(V) ||
            !Number.isFinite(I) ||
            !Number.isFinite(L) ||
            V <= 0 ||
            I <= 0 ||
            L <= 0
        ) {

            result.textContent = "Please enter valid positive values.";
            return;

        }

        if (size.value === "custom" && customInput.value.trim() === "") {

            result.textContent = "Please enter your cable size.";
            return;

        }

        if (!Number.isFinite(A) || A <= 0) {

            result.textContent = "Please enter a valid cable size.";
            return;

        }


        // VOLTAGE DROP CALCULATION

        let voltageDrop;

        if (system.value === "single") {

            // Single-phase resistive approximation
            voltageDrop = (2 * L * I * rho) / A;

        } else {

            // Three-phase resistive approximation
            voltageDrop = (Math.sqrt(3) * L * I * rho) / A;

        }


        // CALCULATE RESULTS

        const dropPercentage = (voltageDrop / V) * 100;

        const receivingVoltage = V - voltageDrop;


        // DISPLAY RESULTS

        result.innerHTML = `
            <h3>Calculation Results</h3>

            <p>
                Voltage Drop:
                <strong>${voltageDrop.toFixed(2)} V</strong>
            </p>

            <p>
                Voltage Drop Percentage:
                <strong>${dropPercentage.toFixed(2)}%</strong>
            </p>

            <p>
                Receiving-End Voltage:
                <strong>${receivingVoltage.toFixed(2)} V</strong>
            </p>

            <p>
                Cable Size:
                <strong>${A} mm²</strong>
            </p>

            <p>
                Conductor:
                <strong>${material.options[material.selectedIndex].text}</strong>
            </p>

            <small>
                Note: This is an estimated voltage drop using
                conductor resistivity at approximately 20°C.
                Cable reactance and operating temperature are not included.
            </small>
        `;

    });

});
// ==========================================
// CABLE SIZING ASSISTANT
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    const system = document.getElementById("csSystem");
    const voltage = document.getElementById("csVoltage");
    const power = document.getElementById("csPower");
    const pf = document.getElementById("csPF");
    const material = document.getElementById("csMaterial");
    const length = document.getElementById("csLength");
    const maxDrop = document.getElementById("csMaxDrop");

    const button = document.getElementById("csCalculateBtn");
    const result = document.getElementById("csResult");

    // STANDARD CABLE SIZES
    const cableSizes = [
        1.5, 2.5, 4, 6, 10, 16, 25, 35,
        50, 70, 95, 120, 150, 185, 240
    ];

    // CALCULATE CABLE SIZE
    button.addEventListener("click", function () {

        const V = Number(voltage.value);
        const P = Number(power.value) * 1000;
        const PF = Number(pf.value);
        const L = Number(length.value);
        const rho = Number(material.value);
        const allowedDrop = Number(maxDrop.value);

        // INPUT VALIDATION
        if (
            voltage.value === "" ||
            power.value === "" ||
            pf.value === "" ||
            length.value === "" ||
            maxDrop.value === ""
        ) {
            result.innerHTML = "Please fill in all required fields.";
            return;
        }

        if (
            V <= 0 ||
            P <= 0 ||
            PF <= 0 ||
            PF > 1 ||
            L <= 0 ||
            allowedDrop <= 0
        ) {
            result.innerHTML = "Please enter valid values.";
            return;
        }

        // ==================================
        // STEP 1: CALCULATE LOAD CURRENT
        // ==================================

        let current;

        if (system.value === "single") {

            current = P / (V * PF);

        } else {

            current = P / (Math.sqrt(3) * V * PF);

        }

        // ==================================
        // STEP 2: CALCULATE ALLOWABLE DROP
        // ==================================

        const maxVoltageDrop = V * (allowedDrop / 100);

        // ==================================
        // STEP 3: FIND REQUIRED CABLE SIZE
        // ==================================

        let selectedCable = null;

        for (let A of cableSizes) {

            let voltageDrop;

            if (system.value === "single") {

                voltageDrop = (2 * L * current * rho) / A;

            } else {

                voltageDrop = (Math.sqrt(3) * L * current * rho) / A;

            }

            if (voltageDrop <= maxVoltageDrop) {

                selectedCable = A;
                break;

            }

        }

        // ==================================
        // STEP 4: CHECK IF CABLE WAS FOUND
        // ==================================

        if (selectedCable === null) {

            result.innerHTML = `
                <h3>Calculation Results</h3>

                <p>
                    Load Current:
                    <strong>${current.toFixed(2)} A</strong>
                </p>

                <p style="color:red;">
                    No cable size in the available list
                    satisfies the selected voltage drop limit.
                </p>

                <p>
                    Consider a larger conductor or shorter cable length.
                </p>
            `;

            return;

        }

        // ==================================
        // STEP 5: CALCULATE FINAL RESULTS
        // ==================================

        let finalVoltageDrop;

        if (system.value === "single") {

            finalVoltageDrop =
                (2 * L * current * rho) / selectedCable;

        } else {

            finalVoltageDrop =
                (Math.sqrt(3) * L * current * rho) / selectedCable;

        }

        const dropPercentage = (finalVoltageDrop / V) * 100;

        const receivingVoltage = V - finalVoltageDrop;

        // ==================================
        // STEP 6: DISPLAY RESULTS
        // ==================================

        result.innerHTML = `
            <h3>Cable Sizing Results</h3>

            <p>
                Load Current:
                <strong>${current.toFixed(2)} A</strong>
            </p>

            <p>
                Recommended Cable Size:
                <strong>${selectedCable} mm²</strong>
            </p>

            <p>
                Voltage Drop:
                <strong>${finalVoltageDrop.toFixed(2)} V</strong>
            </p>

            <p>
                Voltage Drop Percentage:
                <strong>${dropPercentage.toFixed(2)} %</strong>
            </p>

            <p>
                Receiving-End Voltage:
                <strong>${receivingVoltage.toFixed(2)} V</strong>
            </p>

            <p>
                Conductor Material:
                <strong>${material.options[material.selectedIndex].text}</strong>
            </p>

            <p>
                Maximum Allowed Voltage Drop:
                <strong>${allowedDrop}%</strong>
            </p>

            <p style="color:green;">
                Cable satisfies the selected voltage-drop limit.
            </p>

            <small>
                This calculation is based on conductor resistivity
                at approximately 20°C. Cable reactance, operating
                temperature, installation method, grouping, and
                current-carrying capacity are not included.
            </small>
        `;

    });

});
// ==========================================
// ELECTRICAL POWER CALCULATOR
// ==========================================
console.log("Electrical Power Calculator loaded");

console.log("Power system:", document.getElementById("powerSystem"));
console.log("Calculate button:", document.getElementById("powerCalculateBtn"));
console.log("Result element:", document.getElementById("powerResult"));

document.addEventListener("DOMContentLoaded", function () {

    const system = document.getElementById("powerSystem");
    const voltage = document.getElementById("powerVoltage");
    const current = document.getElementById("powerCurrent");
    const pf = document.getElementById("powerPF");
    const powerType = document.getElementById("powerType");

    const button = document.getElementById("powerCalculateBtn");
    const result = document.getElementById("powerResult");
    const triangle = document.getElementById("powerTriangle");

    // UPDATE POWER FACTOR TYPE
    pf.addEventListener("input", function () {

        const value = Number(pf.value);

        if (value === 1) {
            powerType.value = "unity";
            powerType.disabled = true;
        } else {
            powerType.disabled = false;

            if (powerType.value === "unity") {
                powerType.value = "lagging";
            }
        }

    });

    // CALCULATE ELECTRICAL POWER
    button.addEventListener("click", function () {
        console.log("Calculate button clicked!");

        const V = Number(voltage.value);
        const I = Number(current.value);
        const PF = Number(pf.value);

        // INPUT VALIDATION
        if (
            voltage.value.trim() === "" ||
            current.value.trim() === "" ||
            pf.value.trim() === ""
        ) {
            result.textContent = "Please fill in all required fields.";
            triangle.innerHTML = "";
            return;
        }

        if (
            !Number.isFinite(V) ||
            !Number.isFinite(I) ||
            !Number.isFinite(PF) ||
            V <= 0 ||
            I <= 0 ||
            PF <= 0 ||
            PF > 1
        ) {
            result.textContent = "Please enter valid positive values. Power factor must be between 0 and 1.";
            triangle.innerHTML = "";
            return;
        }

        // CALCULATE APPARENT POWER
        let S;

        if (system.value === "single") {

            S = V * I;

        } else {

            S = Math.sqrt(3) * V * I;

        }

        // CALCULATE ACTIVE POWER
        const P = S * PF;

        // CALCULATE REACTIVE POWER MAGNITUDE
        const Q = Math.sqrt(Math.max(0, S * S - P * P));

        // CALCULATE PHASE ANGLE
        const angle = Math.acos(PF) * (180 / Math.PI);

        // DETERMINE LEADING OR LAGGING
        const type = PF === 1 ? "unity" : powerType.value;

        const reactivePower = type === "leading" ? -Q : Q;

        // CONVERT TO PRACTICAL UNITS
        const activeKW = P / 1000;
        const reactiveKVAR = reactivePower / 1000;
        const apparentKVA = S / 1000;

        // DISPLAY RESULTS
        result.innerHTML = `
            <h3>Electrical Power Results</h3>

            <p>
                Active Power:
                <strong>${activeKW.toFixed(2)} kW</strong>
            </p>

            <p>
                Reactive Power:
                <strong>${reactiveKVAR.toFixed(2)} kVAR</strong>
            </p>

            <p>
                Apparent Power:
                <strong>${apparentKVA.toFixed(2)} kVA</strong>
            </p>

            <p>
                Power Factor:
                <strong>${PF.toFixed(3)}</strong>
            </p>

            <p>
                Phase Angle:
                <strong>${angle.toFixed(2)}°</strong>
            </p>

            <p>
                Power Factor Type:
                <strong>${type.toUpperCase()}</strong>
            </p>
        `;

        // POWER TRIANGLE
        const direction = type === "leading" ? -1 : 1;

        triangle.innerHTML = `
            <h3>Power Triangle</h3>

            <svg viewBox="0 0 320 220"
                 width="100%"
                 role="img"
                 aria-label="Power triangle showing active power, reactive power and apparent power">

                <line x1="40" y1="175"
                      x2="270" y2="175"
                      stroke="black"
                      stroke-width="2"/>

                <line x1="270" y1="175"
                      x2="270" y2="${175 - direction * Math.min(Q / S * 120, 120)}"
                      stroke="black"
                      stroke-width="2"/>

                <line x1="40" y1="175"
                      x2="270" y2="${175 - direction * Math.min(Q / S * 120, 120)}"
                      stroke="blue"
                      stroke-width="3"/>

                <text x="140" y="198" font-size="12">
                    P = ${activeKW.toFixed(2)} kW
                </text>

                <text x="275" y="${direction === 1 ? 110 : 205}"
                      font-size="12">
                    Q = ${Math.abs(reactiveKVAR).toFixed(2)} kVAR
                </text>

                <text x="105" y="${direction === 1 ? 115 : 215}"
                      font-size="12">
                    S = ${apparentKVA.toFixed(2)} kVA
                </text>

            </svg>

            <small>
                ${type === "leading"
                    ? "Reactive power is negative (leading)."
                    : type === "lagging"
                    ? "Reactive power is positive (lagging)."
                    : "Unity power factor: reactive power is zero."}
            </small>
        `;

    });

});
// ==========================================
// ENERGY CONSUMPTION & COST CALCULATOR
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    const appliance = document.getElementById("energyAppliance");
    const power = document.getElementById("energyPower");
    const unit = document.getElementById("energyUnit");
    const quantity = document.getElementById("energyQuantity");
    const hours = document.getElementById("energyHours");
    const days = document.getElementById("energyDays");
    const tariff = document.getElementById("energyTariff");

    const button = document.getElementById("energyCalculateBtn");
    const result = document.getElementById("energyResult");

    button.addEventListener("click", function () {

        const P = Number(power.value);
        const N = Number(quantity.value);
        const H = Number(hours.value);
        const D = Number(days.value);
        const T = Number(tariff.value);

        // VALIDATION
        if (
            power.value.trim() === "" ||
            hours.value.trim() === "" ||
            tariff.value.trim() === ""
        ) {
            result.innerHTML = "Please fill in all required fields.";
            return;
        }

        if (
            P <= 0 ||
            N <= 0 ||
            H <= 0 ||
            H > 24 ||
            D <= 0 ||
            D > 31 ||
            T < 0
        ) {
            result.innerHTML = "Please enter valid values.";
            return;
        }

      // CONVERT POWER TO kW
let powerKW;

if (unit.value === "W") {
    powerKW = P / 1000;
} else if (unit.value === "kW") {
    powerKW = P;
} else if (unit.value === "HP") {
    powerKW = P * 0.746;
}
        // TOTAL CONNECTED LOAD
        const totalPower = powerKW * N;

        // ENERGY CALCULATIONS
        const dailyEnergy = totalPower * H;
        const monthlyEnergy = dailyEnergy * D;
        const annualEnergy = dailyEnergy * 365;

        // COST CALCULATIONS
        const dailyCost = dailyEnergy * T;
        const monthlyCost = monthlyEnergy * T;
        const annualCost = annualEnergy * T;

        // DISPLAY RESULTS
        result.innerHTML = `
            <h3>Energy Consumption Results</h3>

            <p>Appliance: <strong>${appliance.value || "Electrical Load"}</strong></p>

            <p>Total Connected Load:
            <strong>${totalPower.toFixed(2)} kW</strong></p>

            <p>Daily Energy Consumption:
            <strong>${dailyEnergy.toFixed(2)} kWh</strong></p>

            <p>Monthly Energy Consumption:
            <strong>${monthlyEnergy.toFixed(2)} kWh</strong></p>

            <p>Annual Energy Consumption:
            <strong>${annualEnergy.toFixed(2)} kWh</strong></p>

            <hr>

            <p>Daily Electricity Cost:
            <strong>${dailyCost.toLocaleString("en-US", {maximumFractionDigits: 2})} TZS</strong></p>

            <p>Monthly Electricity Cost:
            <strong>${monthlyCost.toLocaleString("en-US", {maximumFractionDigits: 2})} TZS</strong></p>

            <p>Annual Electricity Cost:
            <strong>${annualCost.toLocaleString("en-US", {maximumFractionDigits: 2})} TZS</strong></p>
        `;

    });

});