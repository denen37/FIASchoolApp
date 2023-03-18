using System;

namespace ServerApp.Models.Students
{
    public class MoralBehaviour
    {
        public long Id { get; set; }
        public long StudentId { get; set; }
        public short RatingId { get; set; }
        public string Category { get; set; }
        public string Description { get; set; }
        public string RewardOrPunishment { get; set; }
        public DateTime Date { get; set; }
    }

    public class Rating
    {
        public short Id { get; set; } 
        public byte Scale { get; set; }
        public string MoralRemark { get; set; }
    }
}