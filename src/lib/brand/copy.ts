export const brandCopy = {
  appName: "Praguery Academy",
  taglinePrimary: "Hand crafted with sweetness",
  taglineSecondary: "A twist on tradition",
  purpose: "Make life just a little bit sweeter",
  signOff: "Making life just a little bit sweeter for friends & family",
  landingEyebrow: "The Praguery",
  landingTitle: "Tap your role to begin training",
  landingSubtitle:
    "One iPad, every teammate. Tap your role — no PIN. Switch teammate from Settings when the next person starts.",
  offlineBanner:
    "Working offline — progress will sync when connection is restored",
  onlineRestored: "You're back online. Syncing saved work…",
  progressLabel: "Overall progress",
  continueTraining: "Continue training",
  certificateSignOff: "Making life just a little bit sweeter for friends & family",
} as const;

export const ui = {
  switchUser: "Switch teammate",
  syncNow: "Sync now",
  syncIdle: "All caught up",
  syncPending: (n: number) =>
    n === 1 ? "1 change waiting to sync" : `${n} changes waiting to sync`,
  lockedModule: "Complete the previous module to unlock this one.",
  quizPass: "You earned this. Well done.",
  quizFail: "Not quite yet. Review the guide and try again — craft takes practice.",
  checklistComplete: "Checklist complete. Thank you for taking care of the details.",
} as const;
