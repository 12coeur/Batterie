window.onload = function() {
    const batteryLevel = document.getElementById('battery-level');
    const percentage = document.getElementById('percentage');
    const chargingStatus = document.getElementById('charging-status');
    const chargingTime = document.getElementById('charging-time');
    const dischargingTime = document.getElementById('discharging-time');

    if ('getBattery' in navigator) {
        navigator.getBattery().then(battery => {
            console.log('API Batterie accessible');
            updateBatteryInfo(battery);

            // Écoute des changements de niveau de batterie
            battery.addEventListener('levelchange', () => updateBatteryInfo(battery));

            // Écoute des changements d'état de charge
            battery.addEventListener('chargingchange', () => updateBatteryInfo(battery));

            // Écoute des changements de temps de charge
            battery.addEventListener('chargingtimechange', () => updateBatteryInfo(battery));

            // Écoute des changements de temps de décharge
            battery.addEventListener('dischargingtimechange', () => updateBatteryInfo(battery));
        }).catch(error => {
            console.error('Erreur lors de l\'accès à l\'API de la batterie:', error);
            percentage.textContent = "Erreur lors de l'accès à la batterie";
            batteryLevel.style.width = '0%';
        });
    } else {
        console.log('API Batterie non supportée par ce navigateur');
        percentage.textContent = "API Batterie non disponible";
        batteryLevel.style.width = '0%';
    }

    function updateBatteryInfo(battery) {
        // Mise à jour du niveau de la batterie
        const level = battery.level * 100;
        batteryLevel.style.width = `${level}%`;
        percentage.textContent = `${level.toFixed(0)}%`;

        // Mise à jour de l'état de charge
        chargingStatus.textContent = battery.charging ? 'En charge' : 'Décharge';
        chargingStatus.style.color = battery.charging ? '#4CAF50' : '#FF0000';

        // Mise à jour du temps de charge restant
        if (battery.chargingTime === Infinity) {
            chargingTime.textContent = 'Temps de charge indéterminé';
        } else {
            const chargingMinutes = Math.floor(battery.chargingTime / 60);
            chargingTime.textContent = `${chargingMinutes} minutes`;
        }

        // Mise à jour du temps de décharge restant
        if (battery.dischargingTime === Infinity) {
            dischargingTime.textContent = 'Temps de décharge indéterminé';
        } else {
            const dischargingMinutes = Math.floor(battery.dischargingTime / 60);
            dischargingTime.textContent = `${dischargingMinutes} minutes`;
        }
    }
};