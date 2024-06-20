<template>
    <div class="wrapper">
        <Navbar />
        
        <div class="content-wrapper">
            <div class="content-header">
                <div class="container">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="m-0">Strategy Analyzer</h1>
                        </div>
                        <div class="col-sm-6">
                            <ol class="breadcrumb float-sm-right">
                                <li class="breadcrumb-item">
                                    <router-link to="/dashboard">Home</router-link>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="content">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <p>The application allows users to input up to four options contracts, specifying details such as contract type (call or put), strike price, premium, and quantity. Upon submission, the component computes and displays a risk and reward graph where the X-axis represents the underlying asset's price at expiry, and the Y-axis shows the corresponding profit or loss.</p>
                            <p>
                                It provides key metrics such as: maximum profit, maximum loss, and break-even points based on the entered options.
                            </p>
                        </div>

                        <div class="col-lg-6">
                            <div class="card card-primary">
                                <div class="card-header">
                                    <h3 class="card-title">Options Strategy Analyzer</h3>
                                </div>
                                
                                <form @submit.prevent="calculate">
                                    <div class="card-body" style="max-height: 400px; overflow-y: auto;">
                                        <div v-for="(option, index) in options" :key="index" class="option-group">
                                            <h5 class="text-bold">Option {{ index + 1 }}</h5> <!-- Title for each option group -->
                                            
                                            <!-- First row of inputs -->
                                            <div class="form-row">
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label>Type:</label>
                                                        <select v-model="option.type" class="form-control">
                                                            <option value="call">Call</option>
                                                            <option value="put">Put</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label>Strike Price:</label>
                                                        <input type="number" v-model.number="option.strike" class="form-control" placeholder="Enter strike price" required />
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- Second row of inputs -->
                                            <div class="form-row">
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label>Premium:</label>
                                                        <input type="number" v-model.number="option.premium" class="form-control" placeholder="Enter premium" required />
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label>Quantity:</label>
                                                        <input type="number" v-model.number="option.quantity" class="form-control" placeholder="Enter quantity" required />
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- Add a line to separate option groups -->
                                            <hr class="my-4">
                                        </div>
                                    </div>

                                    <div class="card-footer d-flex justify-content-between">
                                        <button type="button" class="btn btn-secondary" @click="addOption">Add Option</button>
                                        <button type="submit" class="btn btn-primary">Calculate</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        
                        <div class="col-lg-6">
                            <div class="card card-success">
                                <div class="card-header">
                                    <h3 class="card-title">Custom Line Chart</h3>
                                </div>
                                <div class="card-body">
                                    <div class="mt-3">
                                        <canvas id="lineChart" style="min-height: 250px; height: 250px; max-height: 250px; max-width: 100%;"></canvas>
                                        <div>
                                            <p>Max Profit: {{ maxProfit }}</p>
                                            <p>Max Loss: {{ maxLoss }}</p>
                                            <p>Break Even Points: {{ breakEvenPoints.join(', ') }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <Footer />
    </div>
</template>

<script>
import Navbar from "../layouts/Navbar.vue";
import Footer from "../layouts/Footer.vue";

export default {
    name: "OptionsStrategyAnalyzer",
    components: {
        Navbar,
        Footer,
    },
    data() {
        return {
            options: [{ type: "call", strike: 100, premium: 5, quantity: 1 }],
            maxProfit: 0,
            maxLoss: 0,
            breakEvenPoints: [],
            lineChart: null // Initialize chart instance
        };
    },
    methods: {
        addOption() {
            this.options.push({ type: "call", strike: 100, premium: 5, quantity: 1 });
        },
        calculate() {
            const priceRange = Array.from({ length: 200 }, (_, i) => i); // price range from 0 to 199
            const profitLoss = priceRange.map(price => {
                return this.options.reduce((total, option) => {
                    const intrinsicValue = option.type === "call" ? Math.max(0, price - option.strike) : Math.max(0, option.strike - price);
                    return total + (intrinsicValue - option.premium) * option.quantity;
                }, 0);
            });

            const graphData = {
                labels: priceRange,
                datasets: [{
                    label: "Profit/Loss",
                    data: profitLoss,
                    borderColor: "rgba(75, 192, 192, 1)",
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                    fill: false,
                }],
            };

            const maxProfit = Math.max(...profitLoss);
            const maxLoss = Math.min(...profitLoss);
            const breakEvenPoints = priceRange.filter((_, i) => profitLoss[i] === 0);

            this.maxProfit = maxProfit;
            this.maxLoss = maxLoss;
            this.breakEvenPoints = breakEvenPoints;

            // Call method to update chart with new data
            this.updateLineChart(graphData);
        },
        updateLineChart(data) {
            const lineChartCanvas = document.getElementById('lineChart').getContext('2d');

            const lineChartOptions = {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Price Range'
                        }
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Profit/Loss'
                        }
                    }
                }
            };

            // Ensure chart exists and update or create new chart
            if (this.lineChart) {
                this.lineChart.data = data;
                this.lineChart.options = lineChartOptions;
                this.lineChart.update();
            } else {
                this.lineChart = new Chart(lineChartCanvas, {
                    type: 'line',
                    data: data,
                    options: lineChartOptions
                });
            }
        }
    },
    mounted() {
        // Initialize chart on component mount (optional)
        // You can also defer initialization until data is available
        // this.updateLineChart(initialGraphData);
    },
    destroyed() {
        // Cleanup chart instance on component destruction (optional)
        if (this.lineChart) {
            this.lineChart.destroy();
        }
    }
};
</script>
