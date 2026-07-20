"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Headset, MessageCircle, MessagesSquare, Send, X } from "lucide-react";
import { toast } from "sonner";
import type { SocialLinks } from "@/lib/types";

export function ChatWidget({ socials }: { socials: SocialLinks }) {
  const [open, setOpen] = useState(false);

  const options = [
    {
      key: "messenger",
      label: "Messenger",
      description: "Chat with us on Facebook",
      icon: MessagesSquare,
      href: socials.messenger,
      color: "bg-[#1004b4]",
    },
    {
      key: "whatsapp",
      label: "WhatsApp",
      description: "Message our sales team",
      icon: Send,
      href: socials.whatsapp,
      color: "bg-[#046304]",
    },
  ].filter((o) => !!o.href);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="w-72 overflow-hidden rounded-2xl border bg-card shadow-soft"
          >
            <div className="bg-gradient-brand px-5 py-4 text-white">
              <p className="text-sm font-bold">Chat with EVR Vet Options</p>
              <p className="mt-0.5 text-xs text-white/85">
                We usually reply within business hours.
              </p>
            </div>
            <div className="flex flex-col p-2.5">
              {options.map(({ key, label, description, icon: Icon, href, color }) => (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-accent"
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${color} text-white`}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold">{label}</span>
                    <span className="block text-xs text-muted-foreground">
                      {description}
                    </span>
                  </span>
                </a>
              ))}
              <button
                type="button"
                onClick={() =>
                  toast.info("Live chat is coming soon!", {
                    description:
                      "In the meantime, reach us instantly on Messenger or WhatsApp.",
                  })
                }
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-accent"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-deep text-white">
                  <Headset className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-sm font-semibold">Live Chat</span>
                  <span className="block text-xs text-muted-foreground">
                    Coming soon
                  </span>
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat options" : "Open chat options"}
        aria-expanded={open}
        className="tap-scale group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-brand text-white shadow-soft transition-transform hover:scale-105"
      >
        {!open && (
          <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-brand-green/40 [animation-duration:2.5s]" />
        )}
        {open ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </button>
    </div>
  );
}
