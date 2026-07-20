"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ContactContentForm,
  SupportContentForm,
} from "@/components/admin/site-content-forms";

export default function ContactAdminPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold tracking-tight">
          Contact & Support
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Address, phone, email, business hours, social links, and the
          warranty / after-sales copy shown on the equipment page.
        </p>
      </div>

      <Tabs defaultValue="contact">
        <TabsList className="mb-6 rounded-xl">
          <TabsTrigger value="contact" className="rounded-lg font-semibold">
            Contact Details
          </TabsTrigger>
          <TabsTrigger value="support" className="rounded-lg font-semibold">
            Warranty & After-Sales
          </TabsTrigger>
        </TabsList>

        <TabsContent value="contact">
          <div className="max-w-3xl rounded-2xl border bg-card p-6 md:p-8">
            <ContactContentForm />
          </div>
        </TabsContent>
        <TabsContent value="support">
          <div className="max-w-3xl rounded-2xl border bg-card p-6 md:p-8">
            <SupportContentForm />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
