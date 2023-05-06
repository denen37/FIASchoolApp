using System;
using System.Collections.Generic;

namespace ServerApp.Models.Students
{
    public class PaymentRecord
    {
        public long Id { get; set; }
        public long StudentId { get; set; }
        public decimal Arrears { get; set; }
        public decimal AmountPayable { get; set; }
        public decimal Total { get; set; }
        public int SessionTermId { get; set; }
        public string Session { get; set; }
        public string Term { get; set; }
        public SessionTermJunction SessionTerm { get; set; }
        public int NumOfPayments { get; set; }
        public ICollection<Payment> Payments { get; set; }
    }

    public class Payment
    {
        public long Id { get; set; }
        public long PaymentRecordId { get; set; }
        public decimal Amount { get; set; }
        public decimal Balance { get; set; }
        public DateTime Date { get; set; }
    }
}