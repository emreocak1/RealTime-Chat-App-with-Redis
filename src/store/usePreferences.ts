import {create} from 'zustand'

type PreferencesProps = {
  soundEnabled:boolean
  setSoundEnabled: (soundEnabled:boolean)=>void
}

export const usePreferences = create<PreferencesProps>((set)=>({
  soundEnabled:true,

  setSoundEnabled: (soundEnabled:boolean) => set({soundEnabled})
}))