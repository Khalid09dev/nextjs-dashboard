// import Form from '@/app/ui/invoices/edit-form';
// import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
// import { fetchCustomers, fetchInvoiceById } from '@/app/lib/data';
// import { notFound } from 'next/navigation';

// export default async function EditInvoice({ params }: { params: { id: string } }) {
// const id = params.id;
// const [invoice, customers] = await Promise.all([
//     fetchInvoiceById(id),
//     fetchCustomers(),
// ]);
// if (!invoice) {
//     notFound();
// }
// return (
//     <main>
//     <Breadcrumbs
//         breadcrumbs={[
//         { label: 'Invoices', href: '/dashboard/invoices' },
//         {
//             label: 'Edit Invoice',
//             href: `/dashboard/invoices/${id}/edit`,
//             active: true,
//         },
//         ]}
//     />
//     <Form invoice={invoice} customers={customers} />
//     </main>
// );
// }

import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers, fetchInvoiceById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { CustomerField, InvoiceForm } from '@/app/lib/definitions';

export async function getServerSideProps({ params }: { params: { id: string } }) {
  const id = params.id;
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);

  if (!invoice) {
    return { notFound: true };  // Equivalent to `notFound()`
  }

  return {
    props: {
      invoice,
      customers,
    },
  };
}

export default function EditInvoice({ invoice, customers }: { invoice: InvoiceForm; customers: CustomerField[] }) {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          { label: 'Edit Invoice', href: `/dashboard/invoices/${invoice.id}/edit`, active: true },
        ]}
      />
      <Form invoice={invoice} customers={customers} />
    </main>
  );
}
