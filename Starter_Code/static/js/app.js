// BUILD THE METADATA PANEL
// ------------------------------------------------------------------------------------------------------------
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    // console.log('data:', data)
    let metadata = data.metadata

    // Filter the metadata for the object with the desired sample number
    for (let i = 0; i < metadata.length; i++) {
      if (metadata[i].id == sample) {
        demoData = metadata[i];
        console.log(`Demographic data for sample ${sample}:`);
        console.log(demoData);
      }
    }

    // Use d3 to select the panel with id of `#sample-metadata`
    let panel = d3.select('#sample-metadata');

    // Use `.html("") to clear any existing metadata
    panel.html("");
    
    // Get keys & values of demoData object
    let keys = Object.keys(demoData)
    let values = Object.values(demoData)
    
    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    for (let i = 0; i < keys.length; i++) {
      // console.log(keys[i], ': ', values[i])
      panel.append('p').text(`${keys[i]}: ${values[i]}`)
  };
  });
}

// BUILD BOTH CHARTS
// ------------------------------------------------------------------------------------------------------------
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    let samples = data.samples

    // Filter the samples for the object with the desired sample number
    for (let i = 0; i < samples.length; i++) {
      if (samples[i].id == sample) {
        sampleData = samples[i];
        console.log(`Sample data for sample ${sample}:`);
        console.log(sampleData);
      }
    }

    // Get the otu_ids, otu_labels, and sample_values
    let otuIds = sampleData.otu_ids
    let otuLabels = sampleData.otu_labels
    let sampleValues = sampleData.sample_values
    
    // Build a Bubble Chart
    let trace1 = {
      x: otuIds,
      y: sampleValues,
      type: 'bubble',
      mode: 'markers',
      text: otuLabels,
      marker: {
        size: sampleValues,
        color: otuIds,
      }
    };

    let bubbleData = [trace1];

    let layout1 = {
      // title: 'Top 10 Bacteria Cultures Found', 
      // xaxis: {
      //   title: {
      //     text: 'Number of Bacteria'
      //   }
      // }
    };

    // Render the Bubble Chart
    Plotly.newPlot('bubble', bubbleData, layout1)

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    let yticks = []
    for (let i = 0; i < otuIds.length; i++) {
      id = `OTU ${otuIds[i]}`
      yticks.push(id)
    };

    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
    let trace2 = {
      x: sampleValues.slice(0,10).reverse(),
      y: yticks.slice(0,10).reverse(),
      type: 'bar',
      orientation: 'h',
      text: otuLabels.slice(0,10).reverse()
    };

    let barData = [trace2];

    let layout2 = {
      title: 'Top 10 Bacteria Cultures Found', 
      xaxis: {
        title: {
          text: 'Number of Bacteria'
        }
      }
    };

    // Render the Bar Chart
    Plotly.newPlot('bar', barData, layout2);
  })};

// FUNCTION TO RUN ON PAGE LOAD
// ------------------------------------------------------------------------------------------------------------
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    names = data.names

    // Use d3 to select the dropdown with id of `#selDataset
    let selDataset = d3.select('#selDataset');

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    for (let i = 0; i <= names.length; i++) {
        selDataset.append("option").text(names[i])
    };

    // Get the first sample from the list
    firstSample = names[0]

    // Build charts and metadata panel with the first sample
    buildCharts(firstSample);
    buildMetadata(firstSample);

  });
}

// FUNCTION FOR EVENT LISTENER
// ------------------------------------------------------------------------------------------------------------
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
};




// Initialize the dashboard
init();
