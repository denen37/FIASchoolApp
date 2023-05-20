using System;

namespace ServerApp.Models.Students
{
    public class MoralBehaviour
    {
        public long Id { get; set; }
        public long StudentId { get; set; }
        public byte RatingId { get; set; }
        public string Category { get; set; }
        public string Description { get; set; }
        public string RewardOrPunishment { get; set; }
        public DateTime Date { get; set; }
        public Rating Rating { get; set; }
    }

    public class Rating
    {
        public byte Id { get; set; } 
        public string Remark { get; set; }
    }
}