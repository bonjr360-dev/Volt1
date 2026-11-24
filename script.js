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
