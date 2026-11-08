export async function getBackupJson(fileName: string) {
  const backup = (await import(`@/sanity/backup/${fileName}.json`)).default;

  return backup;
}
