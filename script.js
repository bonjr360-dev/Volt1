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