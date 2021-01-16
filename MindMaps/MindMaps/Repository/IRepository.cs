using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MindMaps.Data.Entities;

namespace MindMaps.Repository
{
    public interface IRepository<T> where T : class, IEntity
    {
        Task<ICollection<T>> GetAll();
        Task<T> Get(int id);
        Task<T> Add(T entity);
        Task<T> Update(T entity);
        Task<T> Delete(int id);
    }
}
