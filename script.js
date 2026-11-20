
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