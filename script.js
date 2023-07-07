// Fetch data from ThingSpeak API and display in a bar chart
fetch('https://api.thingspeak.com/channels/2210647/feeds.json?api_key=3K7S7ZZIVLRAR2K9')
  .then(response => response.json())
  .then(data => {
    // Extract the sound data from the response
    const soundData = data.feeds.map(feed => parseFloat(feed.field1));
    const labels = soundData.map((_, index) => `Data ${index + 1}`);
    const timestamps = data.feeds.map(feed => feed.created_at);

    // Create a bar chart using Chart.js
    const ctx = document.getElementById('chart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels, // Labels for x-axis
        datasets: [{
          label: 'Sound Data',
          data: soundData, // Sound data values
          backgroundColor: 'rgba(0, 123, 255, 0.8)', // Bar color
          borderColor: 'rgba(0, 123, 255, 1)', // Bar border color
          borderWidth: 1 // Bar border width
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            ticks: {
              autoSkip: true,
              maxTicksLimit: 10, // Maximum number of ticks to display
              maxRotation: 0, // Rotation angle of the tick labels (0 degrees)
              callback: function (value, index) {
                // Format timestamp for display
                const date = new Date(timestamps[index]);
                return date.toLocaleTimeString(); // Adjust formatting as needed
              }
            }
          },
          y: {
            beginAtZero: true // Start y-axis at zero
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              title: function (context) {
                // Display the timestamp as tooltip title
                const dataIndex = context[0].dataIndex;
                const date = new Date(timestamps[dataIndex]);
                return date.toLocaleString(); // Adjust formatting as needed
              },
              label: function (context) {
                // Hide the default label
                return null;
              }
            }
          }
        }
      }
    });
  })
  .catch(error => console.log(error));
