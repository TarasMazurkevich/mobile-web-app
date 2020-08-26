const AddContact = {
  state: {
    relationship: ''
  },
  mutations: {
    changeRelationship (state, newRelationship) {
      state.relationship = newRelationship
    }
  }
}

export default AddContact
