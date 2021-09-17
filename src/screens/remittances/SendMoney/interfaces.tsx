export type StepOptions = 
  | 'summary'
  | 'moneyToSend'
  | 'recipientInformation'

export interface TabsProps {
  next: () => void
}