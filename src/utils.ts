export const dateStringToDate = (dateString: string): Date => {
	// 18/08/2018
	const dateParts = dateString.split('/').map((value: string): number => parseInt(value));

  return new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
};
