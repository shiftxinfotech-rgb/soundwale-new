import Chart from 'chart.js/auto';
window.Chart = window.Chart = require('chart.js');

document.addEventListener('DOMContentLoaded', function () {
    var buyerCounts = window.buyerCounts;  // Ensure these are globally available
    var sellerCounts = window.sellerCounts;

    var buyerChartContainer = document.getElementById('buyerRegistrationsChartContainer');
    if (buyerChartContainer) {
        var buyerCanvas = document.createElement('canvas');
        buyerCanvas.id = 'buyerRegistrationsChart';
        buyerCanvas.width = 450;
        buyerCanvas.height = 300;
        buyerChartContainer.appendChild(buyerCanvas);
        var buyerCtx = buyerCanvas.getContext('2d');
        var buyerRegistrationsChart = new Chart(buyerCtx, {
            type: 'line',
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                datasets: [{
                    label: 'Buyer Registrations',
                    data: buyerCounts,
                    borderColor: '#ca0a0d',
                    borderWidth: 2,
                    fill: false,
                    lineTension: 0.4
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });
    }

    var sellerChartContainer = document.getElementById('sellerRegistrationsChartContainer');
    if (sellerChartContainer) {
        var sellerCanvas = document.createElement('canvas');
        sellerCanvas.id = 'sellerRegistrationsChart';
        sellerCanvas.width = 450;
        sellerCanvas.height = 300;
        sellerChartContainer.appendChild(sellerCanvas);
        var sellerCtx = sellerCanvas.getContext('2d');
        var sellerRegistrationsChart = new Chart(sellerCtx, {
            type: 'line',
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                datasets: [{
                    label: 'Seller Registrations',
                    data: sellerCounts,
                    borderColor: '#ca0a0d',
                    borderWidth: 2,
                    fill: false,
                    lineTension: 0.4
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });
    }
});
