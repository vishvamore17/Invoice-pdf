import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 9,
    fontFamily: "Helvetica",
    color: "#333",
    backgroundColor: "#ffffff",
  },
  container: {
    flex: 1,
  },
  
  // HEADER STYLES
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 25,
    paddingBottom: 15,
    borderBottom: "2 solid #e2e8f0",
  },
  logoContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 6,
  },
  logo: {
    width: 60,
    height: 60,
    objectFit: "contain",
  },
  companyAddress: {
    fontSize: 7,
    color: "#4a5568",
    maxWidth: 200,
    lineHeight: 1.2,
  },
  invoiceHeader: {
    alignItems: "flex-end",
  },
  invoiceTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2d3748",
    marginBottom: 4,
  },
  invoiceMetaContainer: {
    alignItems: "flex-end",
    gap: 2,
  },
  invoiceNumber: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#2d3748",
  },
  invoiceLabel: {
    fontSize: 6,
    color: "#a0aec0",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  
  // THANK YOU FOOTER
  thankYouFooter: {
    marginTop: "auto",
    paddingTop: 15,
    borderTop: "1 solid #e2e8f0",
  },
  thankYouNote: {
    fontSize: 8,
    color: "#4a5568",
    lineHeight: 1.4,
    textAlign: "center",
    fontStyle: "italic",
  },
  pageNumber: {
    textAlign: "center",
    fontSize: 7,
    color: "#a0aec0",
    marginTop: 5,
  },
  
  // MAIN CONTENT STYLES
  addressContainer: {
    flexDirection: "row",
    gap: 15,
    marginBottom: 20,
  },
  addressCard: {
    flex: 1,
    backgroundColor: "#f8fafc",
    padding: 12,
    borderRadius: 6,
    border: "1 solid #e2e8f0",
  },
  addressCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    paddingBottom: 6,
    borderBottom: "1 solid #e2e8f0",
  },
  addressTitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#2d3748",
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  addressBadge: {
    fontSize: 6,
    backgroundColor: "#4299e1",
    color: "white",
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 8,
  },
  addressContent: {
    fontSize: 8,
    color: "#4a5568",
    lineHeight: 1.4,
  },
  addressName: {
    fontWeight: "bold",
    fontSize: 9,
    color: "#2d3748",
    marginBottom: 3,
  },
  addressField: {
    marginBottom: 2,
    fontSize: 8,
  },
  
  // Table with modern design
  table: {
    marginBottom: 20,
    border: "1 solid #e2e8f0",
    borderRadius: 6,
    overflow: "hidden",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#2d3748",
    paddingVertical: 8,
    paddingHorizontal: 6,
  },
  headerCell: {
    fontSize: 8,
    fontWeight: "bold",
    color: "white",
    textTransform: "uppercase",
    letterSpacing: 0.2,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderBottom: "1 solid #e2e8f0",
    minHeight: 32,
  },
  tableRowAlt: {
    backgroundColor: "#f8fafc",
  },
  cell: {
    fontSize: 8,
    color: "#4a5568",
  },
  
  // Column widths
  colSerial: { width: "5%", textAlign: "center" },
  colParticular: { width: "40%", paddingRight: 6 },
  colHSN: { width: "12%", textAlign: "center" },
  colQty: { width: "10%", textAlign: "right" },
  colRate: { width: "15%", textAlign: "right" },
  colAmount: { width: "18%", textAlign: "right"},
  
  // Calculations with modern card
  calculationsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 20,
  },
  calculationsCard: {
    width: "45%",
    backgroundColor: "#f8fafc",
    border: "1 solid #e2e8f0",
    borderRadius: 6,
    overflow: "hidden",
  },
  calculationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderBottom: "1 solid #e2e8f0",
  },
  calculationLabel: {
    color: "#4a5568",
    fontSize: 8,
  },
  calculationValue: {
    fontWeight: "semibold",
    fontSize: 8,
    color: "#2d3748",
  },
  calculationTotal: {
    backgroundColor: "#2d3748",
  },
  calculationTotalLabel: {
    color: "white",
    fontWeight: "bold",
    fontSize: 9,
  },
  calculationTotalValue: {
    color: "#fbbf24",
    fontWeight: "bold",
    fontSize: 10,
  },
  amountInWords: {
    padding: 8,
    backgroundColor: "#edf2f7",
    fontSize: 7,
    color: "#111111",
    fontStyle: "italic",
    lineHeight: 1.3,
  },
  
  // Info boxes
  infoSection: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },
  infoCard: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    border: "1 solid #e2e8f0",
    fontSize: 7,
  },
  bankCard: {
    backgroundColor: "#f0fdf4",
    borderColor: "#bbf7d0",
  },
  termsCard: {
    backgroundColor: "#eff6ff",
    borderColor: "#bfdbfe",
  },
  companyCard: {
    backgroundColor: "#faf5ff",
    borderColor: "#e9d5ff",
  },
  cardTitle: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#2d3748",
    marginBottom: 6,
    paddingBottom: 4,
    borderBottom: "1 solid rgba(0,0,0,0.1)",
  },
  cardText: {
    fontSize: 7.5,
    color: "#4a5568",
    lineHeight: 1.4,
  },
  cardListItem: {
    fontSize: 7.5,
    color: "#4a5568",
    lineHeight: 1.4,
    marginBottom: 2,
  },
  
  // Remarks section
  remarksContainer: {
    marginBottom: 15,
  },
  remarksContent: {
    fontSize: 8,
    color: "#4a5568",
    lineHeight: 1.4,
    backgroundColor: "#fffbeb",
    padding: 10,
    borderRadius: 4,
    border: "1 solid #fcd34d",
  },
  
  // Signatures
  signatureSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  signatureBox: {
    width: "45%",
  },
  signatureLine: {
    borderTop: "1 solid #4a5568",
    marginTop: 30,
    paddingTop: 6,
  },
  signatureText: {
    fontSize: 7,
    color: "#4a5568",
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  
  // For continuation pages
  continuationText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#2d3748",
    marginBottom: 15,
    paddingBottom: 8,
    borderBottom: "1 solid #e2e8f0",
  },
  
  // Content wrapper
  contentWrapper: {
    flex: 1,
    flexDirection: "column",
  },
  footerTitle: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#2d3748",
    marginBottom: 8,
    paddingBottom: 4,
    borderBottom: "1 solid #e2e8f0",
  },
});

// Helper to calculate item total
const calculateItemTotal = (item) => {
  const gross = item.qty * item.rate;
  const discount = (gross * item.discount) / 100;
  const taxable = gross - discount;
  const gst = (taxable * item.gst) / 100;
  return taxable + gst;
};

// Header Component
const Header = ({ invoice }) => (
  <View style={styles.header}>
    <View style={styles.logoContainer}>
      <Image
        style={styles.logo}
        src="/logo.jpeg"
      />
      <Text style={styles.companyAddress}>
        UG 12, Shree Krishna AC Mall, Dindoli, Surat, Gujarat 394210
      </Text>
    </View>
    
    <View style={styles.invoiceHeader}>
      <Text style={styles.invoiceTitle}>TAX INVOICE</Text>
      <View style={styles.invoiceMetaContainer}>
        <Text style={styles.invoiceLabel}>
          Invoice No: <Text style={styles.invoiceNumber}>{invoice.invoiceNo}</Text>
        </Text>
        <Text style={styles.invoiceLabel}>
          Date: <Text style={styles.invoiceNumber}>
            {new Date(invoice.date).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric"
            })}
          </Text>
        </Text>
      </View>
    </View>
  </View>
);

// Thank You Footer Component
const ThankYouFooter = ({ pageNumber, totalPages }) => (
  <View style={styles.thankYouFooter}>
    <Text style={styles.thankYouNote}>
      Thank you for your business! We value your trust and look forward to serving you again.
    </Text>
    <Text style={styles.pageNumber}>
      Page {pageNumber} of {totalPages}
    </Text>
  </View>
);

// Address Section
const AddressSection = ({ invoice }) => (
  <View style={styles.addressContainer}>
    <View style={styles.addressCard}>
      <View style={styles.addressCardHeader}>
        <Text style={styles.addressTitle}>Bill To</Text>
        <View style={[styles.addressBadge, { backgroundColor: "#4299e1" }]}>
          <Text>CUSTOMER</Text>
        </View>
      </View>
      <View style={styles.addressContent}>
        <Text style={styles.addressName}><Text>Name : </Text>{invoice.receiver.name}</Text>
        <Text style={styles.addressField}><Text>Address : </Text>{invoice.receiver.address}</Text>
        <Text style={styles.addressField}>Mobile: {invoice.receiver.mobile}</Text>
        <Text style={styles.addressField}>GSTIN: {invoice.receiver.gst}</Text>
      </View>
    </View>
    
    <View style={styles.addressCard}>
      <View style={styles.addressCardHeader}>
        <Text style={styles.addressTitle}>Ship To</Text>
        <View style={[styles.addressBadge, { backgroundColor: "#48bb78" }]}>
          <Text>CONSIGNEE</Text>
        </View>
      </View>
      <View style={styles.addressContent}>
        <Text style={styles.addressName}><Text>Name : </Text>{invoice.consignee.name}</Text>
        <Text style={styles.addressField}><Text>Address : </Text>{invoice.consignee.address}</Text>
        <Text style={styles.addressField}>Mobile: {invoice.consignee.mobile}</Text>
        <Text style={styles.addressField}>GSTIN: {invoice.consignee.gst}</Text>
      </View>
    </View>
  </View>
);

// Table Section
const TableSection = ({ items, showHeader = true, startIndex = 0 }) => (
  <View style={styles.table}>
    {showHeader && (
      <View style={styles.tableHeader}>
        <Text style={[styles.headerCell, styles.colSerial]}>#</Text>
        <Text style={[styles.headerCell, styles.colParticular]}>DESCRIPTION</Text>
        <Text style={[styles.headerCell, styles.colHSN]}>HSN CODE</Text>
        <Text style={[styles.headerCell, styles.colQty]}>QTY</Text>
        <Text style={[styles.headerCell, styles.colRate]}>RATE (₹)</Text>
        <Text style={[styles.headerCell, styles.colAmount]}>AMOUNT (₹)</Text>
      </View>
    )}
    
    {items.map((item, i) => (
      <View key={i} style={[styles.tableRow, (i + startIndex) % 2 === 1 && styles.tableRowAlt]}>
        <Text style={[styles.cell, styles.colSerial]}>{i + startIndex + 1}</Text>
        <View style={[styles.cell, styles.colParticular]}>
          <Text style={{ fontWeight: "semibold", marginBottom: 1, fontSize: 8 }}>
            {item.particular}
          </Text>
          {item.discount > 0 && (
            <Text style={{ fontSize: 6, color: "#e53e3e" }}>
              Discount: {item.discount}%
            </Text>
          )}
          {item.gst > 0 && (
            <Text style={{ fontSize: 6, color: "#38a169" }}>
              GST: {item.gst}%
            </Text>
          )}
        </View>
        <Text style={[styles.cell, styles.colHSN]}>{item.hsn}</Text>
        <Text style={[styles.cell, styles.colQty]}>{item.qty}</Text>
        <Text style={[styles.cell, styles.colRate]}>{item.rate.toFixed(2)}</Text>
        <Text style={[styles.cell, styles.colAmount]}>{calculateItemTotal(item).toFixed(2)}</Text>
      </View>
    ))}
  </View>
);

// Final Sections (Calculations, Info Cards, Signatures)
const FinalSections = ({ invoice }) => (
  <>
    {/* Calculations */}
    <View style={styles.calculationsContainer}>
      <View style={styles.calculationsCard}>
        <View style={styles.calculationRow}>
          <Text style={styles.calculationLabel}>Subtotal</Text>
          <Text style={styles.calculationValue}>₹ {invoice.totals.taxableValue}</Text>
        </View>
        
        <View style={styles.calculationRow}>
          <Text style={styles.calculationLabel}>GST ({invoice.totals.gstRate || "18"}%)</Text>
          <Text style={styles.calculationValue}>₹ {invoice.totals.gstAmount}</Text>
        </View>
        
        {invoice.totals.discount > 0 && (
          <View style={styles.calculationRow}>
            <Text style={[styles.calculationLabel, { color: "#e53e3e" }]}>Discount</Text>
            <Text style={[styles.calculationValue, { color: "#e53e3e" }]}>
              - ₹ {invoice.totals.discount}
            </Text>
          </View>
        )}
        
        <View style={[styles.calculationRow, styles.calculationTotal]}>
          <Text style={styles.calculationTotalLabel}>TOTAL AMOUNT</Text>
          <Text style={styles.calculationTotalValue}>₹ {invoice.totals.totalAmount}</Text>
        </View>
        
        <View style={styles.amountInWords}>
          <Text>Amount in Words: {invoice.totals.amountInWords || "Rupees " + invoice.totals.totalAmount + " only"}</Text>
        </View>
      </View>
    </View>
    
    {/* Remarks Section */}
    {invoice.remarks && (
      <View style={styles.remarksContainer}>
        <Text style={styles.footerTitle}>REMARKS</Text>
        <View style={styles.remarksContent}>
          <Text>{invoice.remarks}</Text>
        </View>
      </View>
    )}
    
    {/* Information Cards */}
    <View style={styles.infoSection}>
      <View style={[styles.infoCard, styles.bankCard]}>
        <Text style={styles.cardTitle}>BANK DETAILS</Text>
        <Text style={styles.cardText}>
          Account: Sunburn Renewable Energy{"\n"}
          Bank: Bank of Baroda{"\n"}
          A/C: 26690200002271{"\n"}
          IFSC: BARB0DUMSUR{"\n"}
          Branch: Puna Kumbhariya
        </Text>
      </View>
      
      <View style={[styles.infoCard, styles.termsCard]}>
        <Text style={styles.cardTitle}>TERMS & CONDITIONS</Text>
        <Text style={styles.cardListItem}>1. Goods once sold cannot be returned</Text>
        <Text style={styles.cardListItem}>2. Warranty as per manufacturer terms</Text>
        <Text style={styles.cardListItem}>3. Taxes as applicable by government</Text>
        <Text style={styles.cardListItem}>4. Payment within 15 days</Text>
        <Text style={styles.cardListItem}>5. Late payment interest @18% p.a.</Text>
      </View>
      
      <View style={[styles.infoCard, styles.companyCard]}>
        <Text style={styles.cardTitle}>COMPANY DETAILS</Text>
        <Text style={styles.cardText}>
          Sunburn Renewable Energy{"\n"}
          GSTIN: 24FIHPR5445A1ZC{"\n"}
          PAN: FIHPR5445A{"\n"}
          State: Surat, Gujarat (24){"\n"}
          {/* <Text style={{ color: "#38a169", fontWeight: "bold" }}>
            Registered • MSME • ISO Certified
          </Text> */}
        </Text>
      </View>
    </View>
    
    {/* Signatures */}
    <View style={styles.signatureSection}>
      <View style={styles.signatureBox}>
        <View style={styles.signatureLine} />
        <Text style={styles.signatureText}>For Solar Solutions Pro</Text>
        <Text style={[styles.signatureText, { fontSize: 6, marginTop: 2 }]}>
          Authorized Signatory
        </Text>
      </View>
      
      <View style={styles.signatureBox}>
        <View style={styles.signatureLine} />
        <Text style={styles.signatureText}>Customer Acceptance</Text>
        <Text style={[styles.signatureText, { fontSize: 6, marginTop: 2 }]}>
          Signature with Seal
        </Text>
      </View>
    </View>
  </>
);

// Main Page Content
const PageContent = ({ 
  invoice, 
  items, 
  isFirstPage, 
  isLastPage,
  pageNumber, 
  totalPages,
  startIndex = 0 
}) => {
  return (
    <View style={styles.contentWrapper}>
      {/* Address section - Only show on first page */}
      {isFirstPage && <AddressSection invoice={invoice} />}
      
      {/* Continuation header for subsequent pages */}
      {!isFirstPage && (
        <Text style={styles.continuationText}>
          Invoice {invoice.invoiceNo} - Continued from previous page
        </Text>
      )}
      
      {/* Items Table */}
      <TableSection 
        items={items} 
        showHeader={isFirstPage} 
        startIndex={startIndex}
      />
      
      {/* Final sections only on last page */}
      {isLastPage && <FinalSections invoice={invoice} />}
      
      {/* Thank you footer appears only after all content */}
      {isLastPage && <ThankYouFooter pageNumber={pageNumber} totalPages={totalPages} />}
    </View>
  );
};

// Helper to split content into pages with proper pagination
const paginateContent = (invoice) => {
  const pages = [];
  const itemsPerPage = 15; // Adjust based on content height
  
  let currentPageItems = [];
  let currentStartIndex = 0;
  
  // First page includes address section
  let remainingSpaceFirstPage = itemsPerPage - 2; // Account for address section
  
  for (let i = 0; i < invoice.items.length; i++) {
    if (pages.length === 0 && currentPageItems.length >= remainingSpaceFirstPage) {
      pages.push({
        items: [...currentPageItems],
        startIndex: currentStartIndex,
        isFirstPage: true,
        isLastPage: false
      });
      currentPageItems = [];
      currentStartIndex = i;
    } else if (pages.length > 0 && currentPageItems.length >= itemsPerPage) {
      pages.push({
        items: [...currentPageItems],
        startIndex: currentStartIndex,
        isFirstPage: false,
        isLastPage: false
      });
      currentPageItems = [];
      currentStartIndex = i;
    }
    currentPageItems.push(invoice.items[i]);
  }
  
  // Add the last page
  if (currentPageItems.length > 0) {
    pages.push({
      items: [...currentPageItems],
      startIndex: currentStartIndex,
      isFirstPage: pages.length === 0,
      isLastPage: true
    });
  }
  
  return pages;
};

export default function ProfessionalInvoicePDF({ invoice }) {
  const pages = paginateContent(invoice);
  const totalPages = pages.length;
  
  return (
    <Document>
      {pages.map((page, pageIndex) => (
        <Page key={pageIndex} size="A4" style={styles.page} wrap>
          <Header invoice={invoice} />
          <PageContent
            invoice={invoice}
            items={page.items}
            isFirstPage={page.isFirstPage}
            isLastPage={page.isLastPage}
            pageNumber={pageIndex + 1}
            totalPages={totalPages}
            startIndex={page.startIndex}
          />
        </Page>
      ))}
    </Document>
  );
}