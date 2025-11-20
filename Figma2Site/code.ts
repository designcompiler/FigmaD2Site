// Show the plugin UI
figma.showUI(__html__, { width: 300, height: 400 });

// Handle messages from the UI
figma.ui.onmessage = (msg: { type: string }) => {
  if (msg.type === 'get-selection') {
    const selection = figma.currentPage.selection;

    if (selection.length === 0) {
      figma.ui.postMessage({
        type: 'selection-data',
        nodes: [],
        message: 'No nodes selected'
      });
      return;
    }

    // Extract basic info from selected nodes
    const nodeData = selection.map((node: any) => ({
      id: node.id,
      name: node.name,
      type: node.type,
      width: 'width' in node ? node.width : null,
      height: 'height' in node ? node.height : null
    }));

    figma.ui.postMessage({
      type: 'selection-data',
      nodes: nodeData,
      message: `${selection.length} node(s) selected`
    });
  }

  if (msg.type === 'cancel') {
    figma.closePlugin();
  }
};
