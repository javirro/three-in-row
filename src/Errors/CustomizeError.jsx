

const createErrorFactory = function (name) {
  return class PlayerError extends Error {
    constructor(message) {
      super(message)
      this.name = name
    }
  }
}

export const SelectedError = createErrorFactory("SelectedError")
export const OccupiedError = createErrorFactory("PositionError")