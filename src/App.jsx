import React, { useState } from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';

// Стили для PDF (имитирует структуру таблицы из Excel: строки, колонки, заголовки)
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 8,
    lineHeight: 1.2,
    fontFamily: 'Helvetica',
  },
  row: {
    flexDirection: 'row',
    borderBottom: '1px solid #ccc',
    paddingVertical: 2,
  },
  col1: {
    width: '50%',
    paddingRight: 10,
  },
  col2: {
    width: '50%',
  },
  header: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  section: {
    marginBottom: 10,
  },
  text: {
    marginBottom: 2,
  },
});

// Компонент PDF-документа (полностью динамический, на основе данных формы, имитирует все секции из Excel)
const TransportNakladnayaPDF = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Заголовок формы */}
      <View>
        <Text style={styles.header}>Приложение № 4</Text>
        <Text style={styles.text}>к Правилам перевозок грузов автомобильным транспортом</Text>
        <Text style={styles.text}>(в ред. Постановления Правительства РФ от 30.11.2021 № 2116)</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.header}>Транспортная накладная</Text>
      </View>
      <View style={styles.row}>
        <Text>Дата: {data.date}</Text>
        <Text>№: {data.number}</Text>
      </View>
      <View style={styles.row}>
        <Text>Экземпляр №: {data.copyNumber}</Text>
      </View>

      {/* Секция 1: Грузоотправитель и Заказчик */}
      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={[styles.header, styles.col1]}>1. Грузоотправитель</Text>
          <Text style={[styles.header, styles.col2]}>1а. Заказчик услуг по организации перевозки груза (при наличии)</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.col1}>{data.shipperDetails}</Text>
          <Text style={styles.col2}>{data.customerDetails || '-'}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.col1}>(реквизиты, позволяющие идентифицировать Грузоотправителя)</Text>
          <Text style={styles.col2}>(реквизиты, позволяющие идентифицировать Заказчика услуг по организации перевозки груза)</Text>
        </View>
      </View>

      {/* Секция 2: Грузополучатель */}
      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.header}>2. Грузополучатель</Text>
        </View>
        <View style={styles.row}>
          <Text>{data.consigneeDetails}</Text>
        </View>
        <View style={styles.row}>
          <Text>(реквизиты, позволяющие идентифицировать Грузополучателя)</Text>
        </View>
        <View style={styles.row}>
          <Text>{data.deliveryAddress}</Text>
        </View>
        <View style={styles.row}>
          <Text>(адрес места доставки груза)</Text>
        </View>
      </View>

      {/* Секция 3: Груз */}
      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.header}>3. Груз</Text>
        </View>
        <View style={styles.row}>
          <Text>{data.cargoName}</Text>
        </View>
        <View style={styles.row}>
          <Text>(отгрузочное наименование груза (для опасных грузов - в соответствии с ДОПОГ), его состояние и другая необходимая информация о грузе)</Text>
        </View>
        <View style={styles.row}>
          <Text>Масса брутто: {data.grossWeight} кг, Масса нетто: {data.netWeight} кг</Text>
        </View>
        <View style={styles.row}>
          <Text>Размеры (ВxШxД): {data.dimensions} м, Объём: {data.volume} м³</Text>
        </View>
        <View style={styles.row}>
          <Text>(масса груза брутто в килограммах, масса груза нетто в килограммах (при возможности ее определения), размеры (высота, ширина, длина) в метрах (при перевозке крупногабаритного груза), объем груза в кубических метрах и плотность груза в соответствии с документацией на груз (при необходимости), дополнительные характеристики груза, учитывающие отраслевые особенности (при необходимости)</Text>
        </View>
        <View style={styles.row}>
          <Text>Количество мест: {data.packages}, Маркировка/тара/упаковка: {data.packaging || '-'}</Text>
        </View>
        <View style={styles.row}>
          <Text>(количество грузовых мест, маркировка, вид тары и способ упаковки)</Text>
        </View>
      </View>

      {/* Секция 4: Сопроводительные документы */}
      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.header}>4. Сопроводительные документы на груз (при наличии)</Text>
        </View>
        <View style={styles.row}>
          <Text>{data.documents || '-'}</Text>
        </View>
        <View style={styles.row}>
          <Text>(перечень прилагаемых к транспортной накладной документов, предусмотренных ДОПОГ, санитарными, таможенными (при наличии), карантинными, иными правилами в соответствии с законодательством Российской Федерации, либо регистрационные номера указанных документов, если такие документы (сведения о таких документах) содержатся в государственных информационных системах)</Text>
        </View>
      </View>

      {/* Секция 5: Указания грузоотправителя */}
      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.header}>5. Указания грузоотправителя по особым условиям перевозки</Text>
        </View>
        <View style={styles.row}>
          <Text>Маршрут: {data.route || '-'}, Сроки доставки: {data.deliveryTerms || '-'}</Text>
        </View>
        <View style={styles.row}>
          <Text>(маршрут перевозки, дата и время/сроки доставки груза (при необходимости)</Text>
        </View>
        <View style={styles.row}>
          <Text>{data.specialInstructions || '-'}</Text>
        </View>
        <View style={styles.row}>
          <Text>(указания, необходимые для выполнения фитосанитарных, санитарных, карантинных, таможенных и прочих требований, установленных законодательством Российской Федерации)</Text>
        </View>
      </View>

      {/* Секция 6: Перевозчик */}
      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.header}>6. Перевозчик</Text>
        </View>
        <View style={styles.row}>
          <Text>{data.carrierDetails}</Text>
        </View>
        <View style={styles.row}>
          <Text>(реквизиты, позволяющие идентифицировать Перевозчика)</Text>
        </View>
        <View style={styles.row}>
          <Text>Водитель(-и): {data.driverDetails}</Text>
        </View>
        <View style={styles.row}>
          <Text>(реквизиты, позволяющие идентифицировать водителя(-ей)</Text>
        </View>
      </View>

      {/* Секция 7: Транспортное средство */}
      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.header}>7. Транспортное средство</Text>
        </View>
        <View style={styles.row}>
          <Text>Тип/марка: {data.vehicleType}, Грузоподъёмность: {data.capacity || '-'} т, Вместимость: {data.volumeCapacity || '-'} м³</Text>
        </View>
        <View style={styles.row}>
          <Text>(тип, марка, грузоподъемность (в тоннах), вместимость (в кубических метрах)</Text>
        </View>
        <View style={styles.row}>
          <Text>Регистрационный номер: {data.vehicleReg}</Text>
        </View>
        <View style={styles.row}>
          <Text>(регистрационный номер транспортного средства)</Text>
        </View>
        <View style={styles.row}>
          <Text>Тип владения: {data.ownershipType} (1 - собственность; 2 - совместная собственность супругов; 3 - аренда; 4 - лизинг; 5 - безвозмездное пользование)</Text>
        </View>
      </View>

      {/* Секция 8: Прием груза */}
      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.header}>8. Прием груза</Text>
        </View>
        <View style={styles.row}>
          <Text>Лицо, осуществляющее погрузку: {data.loadingEntity || data.shipperDetails}</Text>
        </View>
        <View style={styles.row}>
          <Text>(реквизиты лица, осуществляющего погрузку груза в транспортное средство)</Text>
        </View>
        <View style={styles.row}>
          <Text>Адрес погрузки: {data.loadingAddress}</Text>
        </View>
        <View style={styles.row}>
          <Text>(адрес места погрузки)</Text>
        </View>
        <View style={styles.row}>
          <Text>Заявленная дата/время: {data.loadingTime}</Text>
        </View>
        <View style={styles.row}>
          <Text>Фактическая дата/время прибытия: ____ ____________ 2025 г. ______ч:______мин.</Text>
        </View>
        <View style={styles.row}>
          <Text>Фактическая дата/время убытия: ____ ____________ 2025 г. ______ч:______мин.</Text>
        </View>
        <View style={styles.row}>
          <Text>Подпись лица, осуществившего погрузку: {data.loadingSignature}</Text>
        </View>
        <View style={styles.row}>
          <Text>Подпись водителя: {data.driverDetails}</Text>
        </View>
      </View>

      {/* Секция 9: Переадресовка (опционально) */}
      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.header}>9. Переадресовка (при наличии)</Text>
        </View>
        <View style={styles.row}>
          <Text>{data.redirection || '-'}</Text>
        </View>
      </View>

      {/* Секция 10: Выдача груза */}
      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.header}>10. Выдача груза</Text>
        </View>
        <View style={styles.row}>
          <Text>Адрес выгрузки: {data.unloadingAddress}</Text>
        </View>
        <View style={styles.row}>
          <Text>(адрес места выгрузки)</Text>
        </View>
        <View style={styles.row}>
          <Text>Заявленная дата/время: {data.unloadingTime}</Text>
        </View>
        <View style={styles.row}>
          <Text>Фактическая дата/время прибытия: ____ ____________ 2025 г. ______ч:______мин.</Text>
        </View>
        <View style={styles.row}>
          <Text>Фактическая дата/время убытия: ____ ____________ 2025 г. ______ч:______мин.</Text>
        </View>
        <View style={styles.row}>
          <Text>Подпись грузополучателя: {data.unloadingSignature}</Text>
        </View>
        <View style={styles.row}>
          <Text>Подпись водителя: {data.driverDetails}</Text>
        </View>
      </View>

      {/* Секция 11: Отметки */}
      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.header}>11. Отметки грузоотправителей, грузополучателей, перевозчиков (при необходимости)</Text>
        </View>
        <View style={styles.row}>
          <Text>{data.notes || '-'}</Text>
        </View>
      </View>

      {/* Секция 12: Стоимость */}
      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.header}>12. Стоимость перевозки груза (установленная плата) в рублях (при необходимости)</Text>
        </View>
        <View style={styles.row}>
          <Text>Всего: {data.cost} руб.</Text>
        </View>
        <View style={styles.row}>
          <Text>(стоимость перевозки без налога - всего)</Text>
        </View>
      </View>

      {/* Подписи в конце */}
      <View style={styles.section}>
        <View style={styles.row}>
          <Text>Подпись перевозчика: ________________ Дата: {data.carrierSignDate || new Date().toLocaleDateString()}</Text>
        </View>
        <View style={styles.row}>
          <Text>Подпись грузоотправителя: ________________ Дата: {data.shipperSignDate || new Date().toLocaleDateString()}</Text>
        </View>
      </View>
    </Page>
  </Document>
);

function App() {
  // Состояние формы (дефолтные значения из вашего Excel, все поля покрыты)
  const [formData, setFormData] = useState({
    number: '3043',
    date: '2025-09-19', // Формат для input type="date"
    copyNumber: '',
    shipperDetails: 'ООО «ДДС» 690014, 680000, Хабаровский край, г.о. Город Хабаровск, г Хабаровск, ул Истомина, дом 49, помещение 2, ИНН 2700034094',
    customerDetails: '',
    consigneeDetails: 'ООО «ДДС» 690014, 680000, Хабаровский край, г.о. Город Хабаровск, г Хабаровск, ул Истомина, дом 49, помещение 2, ИНН 2700034094',
    deliveryAddress: 'с. Бриакан, + 30 км от п. Бриакан в сторону реки Керби',
    cargoName: 'Комплект оборудование (Сеялка)',
    grossWeight: '',
    netWeight: '',
    dimensions: '',
    volume: '',
    packages: '',
    packaging: '',
    documents: '',
    route: '',
    deliveryTerms: '',
    specialInstructions: '',
    carrierDetails: 'Общество с ограниченной ответственностью "МНОГОВОЗОФФ", ИНН 2724218020, 680015, Хабаровский край, Хабаровск г, Суворова ул, дом 82а, офис 1, тел.: +7 (421) 2455000',
    driverDetails: 'Бочаров Игорь Михайлович / ИНН 270321309390',
    vehicleType: 'Тягач Скания / полуприцеп',
    vehicleReg: 'Р 805 УО (27 ) / АА 8007 (27)',
    ownershipType: '3',
    capacity: '',
    volumeCapacity: '',
    loadingEntity: '',
    loadingAddress: 'Хабаровский край, с.Тополево, ул. Дачная 11',
    loadingTime: '',
    loadingSignature: 'V',
    redirection: '',
    unloadingAddress: 'с. Бриакан, + 30 км от п. Бриакан в сторону реки Керби',
    unloadingTime: '',
    unloadingSignature: 'v',
    notes: '',
    cost: '',
    carrierSignDate: '',
    shipperSignDate: '',
  });

  // Обработчик изменений (для всех input/textarea)
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Заполнение транспортной накладной</h1>
      <p>Заполните поля ниже. Дефолтные значения взяты из вашего Excel. Нажмите "Скачать PDF" для генерации документа.</p>
      <form style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
        <label>
          Номер накладной:
          <input name="number" value={formData.number} onChange={handleChange} />
        </label>
        <label>
          Дата:
          <input name="date" type="date" value={formData.date} onChange={handleChange} />
        </label>
        <label>
          Экземпляр №:
          <input name="copyNumber" value={formData.copyNumber} onChange={handleChange} />
        </label>
        <label>
          Грузоотправитель (реквизиты):
          <textarea name="shipperDetails" value={formData.shipperDetails} onChange={handleChange} rows={3} />
        </label>
        <label>
          Заказчик услуг (при наличии):
          <textarea name="customerDetails" value={formData.customerDetails} onChange={handleChange} rows={3} />
        </label>
        <label>
          Грузополучатель (реквизиты):
          <textarea name="consigneeDetails" value={formData.consigneeDetails} onChange={handleChange} rows={3} />
        </label>
        <label>
          Адрес доставки:
          <input name="deliveryAddress" value={formData.deliveryAddress} onChange={handleChange} />
        </label>
        <label>
          Наименование груза:
          <input name="cargoName" value={formData.cargoName} onChange={handleChange} />
        </label>
        <label>
          Масса брутто (кг):
          <input name="grossWeight" value={formData.grossWeight} onChange={handleChange} type="number" />
        </label>
        <label>
          Масса нетто (кг):
          <input name="netWeight" value={formData.netWeight} onChange={handleChange} type="number" />
        </label>
        <label>
          Размеры (ВxШxД в м):
          <input name="dimensions" value={formData.dimensions} onChange={handleChange} />
        </label>
        <label>
          Объём (м³):
          <input name="volume" value={formData.volume} onChange={handleChange} type="number" />
        </label>
        <label>
          Количество мест:
          <input name="packages" value={formData.packages} onChange={handleChange} type="number" />
        </label>
        <label>
          Тара/упаковка:
          <input name="packaging" value={formData.packaging} onChange={handleChange} />
        </label>
        <label>
          Сопроводительные документы:
          <textarea name="documents" value={formData.documents} onChange={handleChange} rows={2} />
        </label>
        <label>
          Маршрут:
          <input name="route" value={formData.route} onChange={handleChange} />
        </label>
        <label>
          Сроки доставки:
          <input name="deliveryTerms" value={formData.deliveryTerms} onChange={handleChange} />
        </label>
        <label>
          Особые указания:
          <textarea name="specialInstructions" value={formData.specialInstructions} onChange={handleChange} rows={2} />
        </label>
        <label>
          Перевозчик (реквизиты):
          <textarea name="carrierDetails" value={formData.carrierDetails} onChange={handleChange} rows={3} />
        </label>
        <label>
          Водитель (реквизиты):
          <input name="driverDetails" value={formData.driverDetails} onChange={handleChange} />
        </label>
        <label>
          Тип/марка ТС:
          <input name="vehicleType" value={formData.vehicleType} onChange={handleChange} />
        </label>
        <label>
          Рег. номер ТС:
          <input name="vehicleReg" value={formData.vehicleReg} onChange={handleChange} />
        </label>
        <label>
          Тип владения (1-5):
          <input name="ownershipType" value={formData.ownershipType} onChange={handleChange} />
        </label>
        <label>
          Грузоподъёмность (т):
          <input name="capacity" value={formData.capacity} onChange={handleChange} type="number" />
        </label>
        <label>
          Вместимость (м³):
          <input name="volumeCapacity" value={formData.volumeCapacity} onChange={handleChange} type="number" />
        </label>
        <label>
          Лицо погрузки:
          <input name="loadingEntity" value={formData.loadingEntity} onChange={handleChange} />
        </label>
        <label>
          Адрес погрузки:
          <input name="loadingAddress" value={formData.loadingAddress} onChange={handleChange} />
        </label>
        <label>
          Дата/время погрузки:
          <input name="loadingTime" value={formData.loadingTime} onChange={handleChange} />
        </label>
        <label>
          Подпись погрузки:
          <input name="loadingSignature" value={formData.loadingSignature} onChange={handleChange} />
        </label>
        <label>
          Переадресовка:
          <textarea name="redirection" value={formData.redirection} onChange={handleChange} rows={2} />
        </label>
        <label>
          Адрес выгрузки:
          <input name="unloadingAddress" value={formData.unloadingAddress} onChange={handleChange} />
        </label>
        <label>
          Дата/время выгрузки:
          <input name="unloadingTime" value={formData.unloadingTime} onChange={handleChange} />
        </label>
        <label>
          Подпись выгрузки:
          <input name="unloadingSignature" value={formData.unloadingSignature} onChange={handleChange} />
        </label>
        <label>
          Отметки:
          <textarea name="notes" value={formData.notes} onChange={handleChange} rows={2} />
        </label>
        <label>
          Стоимость (руб.):
          <input name="cost" value={formData.cost} onChange={handleChange} type="number" />
        </label>
        <label>
          Дата подписи перевозчика:
          <input name="carrierSignDate" type="date" value={formData.carrierSignDate} onChange={handleChange} />
        </label>
        <label>
          Дата подписи грузоотправителя:
          <input name="shipperSignDate" type="date" value={formData.shipperSignDate} onChange={handleChange} />
        </label>
      </form>

      {/* Кнопка для скачивания PDF */}
      <div style={{ marginTop: '20px' }}>
        <PDFDownloadLink document={<TransportNakladnayaPDF data={formData} />} fileName={`nakladnaya_${formData.number}.pdf`}>
          {({ loading }) => (loading ? 'Генерация PDF...' : 'Скачать PDF')}
        </PDFDownloadLink>
      </div>

      {/* Просмотр PDF в браузере (для предпросмотра) */}
      <h2>Предпросмотр PDF</h2>
      <PDFViewer width="100%" height="800px">
        <TransportNakladnayaPDF data={formData} />
      </PDFViewer>
    </div>
  );
}

export default App;