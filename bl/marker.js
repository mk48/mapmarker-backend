// keep all the marker info in-memory array
let markers = [];

// =============================================== Get() ==========================================
/**
 * Get a particular marker
 *
 * @param {*} id
 * @returns marker object
 */
function Get(id) {
  const marker = markers.find(m => m.id === id);

  if (marker) {
    return marker;
  } else {
    throw new Error("Requested marker is not found");
  }
}

// =============================================== Insert ==========================================
/**
 * Insert one marker to the markers array
 *
 * @param {*} marker
 */
function Insert(marker) {
  markers.push(marker);
}

// =============================================== Update ==========================================
/**
 * Update a particular marker
 *
 * @param {*} id
 * @param {*} updatedMarkerProperties, need not to be full properties only the properties which needs to be updated
 */
function Update(id, updatedMarkerProperties) {
  const upatedMarkerArray = markers.map((marker, i) => {
    if (marker.id === id) {
      return { ...marker, ...updatedMarkerProperties };
    } else {
      return marker;
    }
  });

  markers = upatedMarkerArray;
}

// =============================================== Delete ==========================================
function Delete(id) {
  markers = markers.filter(marker => marker.id !== id);
}

// =============================================== Export ==========================================

module.exports = {
  Get: Get,
  Insert: Insert,
  Update: Update,
  Delete: Delete
};
