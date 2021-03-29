import { atom, selectorFamily } from 'recoil'

export const userAtom = atom({
  key: "userAtom",
  default: {}
})

export const reviewsAtom = atom({
  key:"reviewsAtom",
  default: []
})

export const reviewAtom = (id) => atom({
  key:`review${id}`,
  default: reviewsAtom[id]
})

export const appointmentsAtom = atom({
  key: "appointmentsAtom",
  default: []
})

export const appointmentAtom = (id) => atom({
  key: `appointment${id}`,
  default: {}
})

export const conversationsAtom = atom({
  key: "conversationsAtom",
  default: []
})

export const convoSelector = selectorFamily({
  key: "convoSelector",
  get: id => ({get}) => { 
    let convos = get(conversationsAtom)
    return convos.filter(convo => convo.id === id)[0]
  }
 
})

export const portfolioAtom = atom({
  key: "portfolioAtom",
  default: []
})

export const openConvos = atom({
  key: "openConvos",
  default: []
})