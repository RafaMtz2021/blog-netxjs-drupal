import { useDispatch, useSelector, useStore } from 'react-redux'
import type { AppDispatch, AppStore, RootState } from '../store'

// Hook tipado para dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

// Hook tipado para selector
export const useAppSelector = useSelector.withTypes<RootState>()

// Hook tipado para acceder al store completo (raro usarlo)
export const useAppStore = useStore.withTypes<AppStore>()