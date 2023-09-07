export const formatRupiah = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
};
  
export const formatDateTime = (isoDateString) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  };
  
  const utcDate = new Date(isoDateString);
  const wibDate = utcDate.toLocaleDateString('id-ID', options);
  
  return wibDate.replace(/GMT\+7:00$/, 'WIB').replace('pukul', '');
}